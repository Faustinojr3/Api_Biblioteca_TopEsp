import { Request, Response, application} from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Endereco } from './endereco.entity';

export class EnderecoController{

    public async list(req: Request, res: Response){
        const endereco = await AppDataSource.manager.find(Endereco);
        
        return res.status(200).json({
            Total_Enderecos: endereco.length,
            Enderecos_Cadastrados: endereco
        });
    }

    public async create (req: Request, res: Response){
        let { numero, bairro, cidade, estado, cep, rua, pais, complemento } = req.body

        let endereco_new = new Endereco()
        endereco_new.numero = numero;
        endereco_new.bairro = bairro;
        endereco_new.cidade = cidade;
        endereco_new.estado = estado;
        endereco_new.cep = cep;
        endereco_new.rua = rua;
        endereco_new.pais = pais;
        endereco_new.complemento = complemento;

        const endereco_new_save = await AppDataSource.manager.save(endereco_new);

        return res.status(201).json(endereco_new_save);
    }

    public async update(req: Request, res: Response){
        const { cod } = req.params;

        const endereco_id = await AppDataSource.manager.findOneBy(Endereco, {id: parseInt(cod) });

        if(endereco_id == null){
            return res.status(404).json({ erro: "Endereco não encontrado"})
        }

        let { numero, bairro, cidade, estado, cep, rua, pais, complemento } = req.body

        endereco_id.numero = numero,
        endereco_id.bairro = bairro,
        endereco_id.cidade = cidade,
        endereco_id.estado = estado,
        endereco_id.cep = cep,
        endereco_id.rua = rua,
        endereco_id.pais = pais,
        endereco_id.complemento = complemento

        const endereco_id_updt = AppDataSource.manager.save(endereco_id);

        return res.json(endereco_id_updt);
    }

    public async destroy(req: Request, res: Response){
        const { cod } = req.params;

        const endereco_id = await AppDataSource.manager.findOneBy(Endereco, { id: parseInt(cod) });

        if(endereco_id == null){
            return res.status(404).json({ erro: "Endereco não encontrado!" });
        }

        await AppDataSource.manager.delete(Endereco, endereco_id);

        return res.status(204).json();
    }

    public async show(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const endereco_id = await AppDataSource.manager.findOneBy(Endereco, {id: parseInt(cod)});

        if (endereco_id == null) {
            return res.status(404).json({ erro: 'Endereco não encontrada!' });
        }

        return res.json(endereco_id);
    }
}