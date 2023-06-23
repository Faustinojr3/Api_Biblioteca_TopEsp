<<<<<<< HEAD

=======
//FAUSTINO01
>>>>>>> Faustino_branch
import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Pessoa } from './pessoa.entity';
import { Contato } from '../contato/contato.entity';
import { Endereco } from '../endereco/endereco.entity';
import { validate } from 'class-validator';

export class PessoaController{
    public async list (req: Request, res: Response){
        const pessoa = await AppDataSource.manager.find(Pessoa)    
        return res.status(200).json({
            Total_Pessoas: pessoa.length,
            Pessoas_Cadastradas: pessoa
        })
    }

    public async create(req: Request, res: Response){
        let { nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id } = req.body;
        
        if(contato_id == undefined) {
            return res.status(404).json({ erro: 'Contato não encontrado'})
        }

        const contato = await AppDataSource.manager.findOneBy(Contato, {id: contato_id} )

        if(contato == null){
            return res.status(404).json({ erro: 'Contato inexistente'})
        }

        if(endereco_id == undefined){
            return res.status(404).json({ erro: 'Endereco não encontrado'})
        }

        const endereco = await AppDataSource.manager.findOneBy(Endereco, {id: endereco_id });

        if(endereco == null){
            return res.status(404).json({ erro: 'Endereco inexistente'})
        }

        let pessoa_new = new Pessoa();
        pessoa_new.nome = nome,
        pessoa_new.cpf = cpf,
        pessoa_new.rg = rg,
        pessoa_new.data_nascimento = data_nascimento,
        pessoa_new.sexo = sexo,
        pessoa_new.contato = contato_id,
        pessoa_new.endereco = endereco_id

        const erros = await validate(pessoa_new);

        if(erros.length > 0){
            return res.status(400).json(erros);
        }

        const pessoa_new_save = await AppDataSource.manager.save(pessoa_new);

        return res.status(201).json(pessoa_new_save);
    }

    public async destroy(req: Request, res: Response){
        const { cod } = req.params;

        const pessoa_id = await AppDataSource.manager.findOneBy(Pessoa, { id:parseInt(cod) });

        if(pessoa_id == null){
            return res.status(404).json({ erro: 'Pessoa não encontrada'})
        }

        await AppDataSource.manager.delete(Pessoa, pessoa_id);

        return res.status(204).json();
    }

    public async update(req: Request, res: Response){
        const { cod } = req.params;

        const pessoa_id = await AppDataSource.manager.findOneBy(Pessoa, {id: parseInt(cod) });

        if(pessoa_id == null){
            return res.status(404).json({erro: 'Pessoa não encontrada'});
        }

        let { nome, cpf, rg, data_nascimento, sexo, contato_id, endereco_id } = req.body;

        pessoa_id.nome = nome;
        pessoa_id.cpf = cpf,
        pessoa_id.rg = rg,
        pessoa_id.data_nascimento = data_nascimento,
        pessoa_id.sexo = sexo,
        pessoa_id.contato = contato_id,
        pessoa_id.endereco = endereco_id

        const pessoa_id_updt = await AppDataSource.manager.save(pessoa_id);

        return res.json(pessoa_id_updt)
    }

    public async show(req: Request, res: Response){
        const {cod }  = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json();
        }

        const pessoa_id = await AppDataSource.manager.findOneBy(Pessoa, {id: parseInt(cod) })

        if(pessoa_id == null){
            return res.status(404).json({ erro: 'Pessoa não encontrada' })
        }

        return res.json(pessoa_id);
    }
}