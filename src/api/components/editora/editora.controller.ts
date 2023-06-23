import { Request, Response} from 'express';
import { Editora } from './editora.entity'
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { validate } from 'class-validator';

export class EditoraController {

    //METODO GET
    public async list(req: Request, res: Response){
        const editoras = await AppDataSource.manager.find(Editora);
        return res.status(200).json({
            Total_Editoras: editoras.length,
            Editoras_Cadastradas: editoras 
        })
    }

    //METODO PUT
    public async create(req: Request, res: Response){
        let{razao_social, nome_fantasia, cnpj} = req.body;
        let editora_new = new Editora();
        editora_new.razao_social = razao_social;
        editora_new.nome_fantasia = nome_fantasia;
        editora_new.cnpj = cnpj;

        const erros = await validate(editora_new);

        if(erros.length > 0){
            return res.status(400).json(erros);
        }
        
        const editora_new_save = await AppDataSource.manager.save(editora_new);

        return res.status(201).json({
            editora_new_save,
            message:'Editora salva com sucesso'
        })
    }

    public async update(req: Request, res: Response){
        const {cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }
        
        const editora_id = await AppDataSource.manager.findOneBy(Editora, { id: parseInt(cod) });    

        if(editora_id == null){
            return res.status(404).json({ erro:"Editora não encontrada!" })
        }

        let { razao_social, nome_fantasia, cnpj } = req.body

        editora_id.razao_social = razao_social;
        editora_id.nome_fantasia = nome_fantasia;
        editora_id.cnpj = cnpj;

        const editora_id_updt = await AppDataSource.manager.save(editora_id)

        return res.json({
            editora_id_updt,
            message: "Editora atulizada no banco de dados"
        
        })
    }

    public async destroy(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const editora_id = await AppDataSource.manager.findOneBy(Editora, {id: parseInt(cod)})

        if(editora_id == null){
            return res.status(404).json({erro: "Editora não encontrada"})
        }
            
        await AppDataSource.manager.delete(Editora, editora_id);

        return res.status(204).json();
    }

    public async show(req: Request, res: Response){
        const { cod } = req.params;
        
        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json({ erro: "Digite um id valido"})
        }

        const editora_id = await AppDataSource.manager.findOneBy(Editora, {id: parseInt(cod)})

        await AppDataSource.manager.delete(Editora, editora_id);

        if(editora_id == null){
            return res.status(404).json({erro: "Editora não encontrada"})
        }

        return res.json(editora_id);
    }
}