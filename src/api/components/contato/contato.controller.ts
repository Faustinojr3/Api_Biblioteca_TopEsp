import { Request, Response, application } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Contato } from './contato.entity'
import { validate } from 'class-validator';


export class ContatoController{
    public async list (req: Request, res: Response){
       const contato = await AppDataSource.manager.find(Contato);
       
       return res.status(200).json({
        Total_Contato: contato.length,
        Contatos_Cadastrados: contato
       })  
    }

    public async create (req: Request, res: Response){
        let{ rede_social, email, celular, telefone } = req.body;
        
        let contato_new = new Contato()
        contato_new.rede_social = rede_social;
        contato_new.email = email;
        contato_new.celular = celular;
        contato_new.telefone = telefone;
        
        const erros = await validate (contato_new);
        
        if(erros.length > 0){
            return res.status(400).json(erros);
        }

        const contato_new_save = await AppDataSource.manager.save(contato_new);

        return res.status(200).json(contato_new_save);
    }
    
    public async update (req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const contato_id = await AppDataSource.manager.findOneBy(Contato, {id: parseInt(cod)});

        if(contato_id == null){
            return res.status(404).json({erro: "Contato não encontrado"})
        }

        let { rede_social, email, celular, telefone } = req.body;
        contato_id.rede_social = rede_social;
        contato_id.email = email;
        contato_id.celular = celular;
        contato_id.telefone = telefone;

        const contato_id_upd = await AppDataSource.manager.save(contato_id);

        return res.json(contato_id_upd);
    }

    public async destroy(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const contato_id = await AppDataSource.manager.findOneBy(Contato, { id: parseInt(cod)});

        if(contato_id == null){
           return res.status(404).json({ erro: "contato não encontrado!"})
        }

        await AppDataSource.manager.delete(Contato, contato_id);
        
        return res.status(204).json()
    }
    
    public async show(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const contato_id = await AppDataSource.manager.findOneBy(Contato, {id: parseInt(cod)});

        if(contato_id == null){
            return res.status(404).json({ erro: "Contato não encontrado"})
        }

        return res.json(contato_id);
    }
}