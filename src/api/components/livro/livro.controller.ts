<<<<<<< HEAD

=======
//FAUSTINO01
>>>>>>> Faustino_branch
import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Livro } from './livro.entity';
import { validate } from 'class-validator';
import { Autor } from '../autor/autor.entity';
import { Editora } from '../editora/editora.entity';    


export class LivroController{
    public async list(req: Request, res: Response){
        const livro = await AppDataSource.manager.find(Livro);
        return res.status(200).json({
            Total_Livros: livro.length,
            Livros_Cadastrados: livro
        })
    }

    public async create(req: Request, res: Response){
        let { sinopse, isbn, titulo, quantidade_exemplares, ano_publicacao, exemplares_disponivel, autor_id, editora_id } = req.body;

        //verificando se foi passado o id
        if(autor_id == undefined) {
            return res.status(404).json({ erro: 'Autor não encontrado'})
        }
        //consultando o id no banco e armazenando dentro de autor
        const autor = await AppDataSource.manager.findOneBy(Autor, {id: autor_id})
        //verificando se o foi encontrado algum id no id passado
        if(autor == null){
            return res.status(404).json({ erro: 'Autor inexistente'})
        }

        //verificando se foi passado o id
        if(editora_id == undefined){
            return res.status(404).json({ erro: 'Editora não encontrada'})
        }
        //consultando o id no banco e armazenando dentro de livro2
        const editora = await AppDataSource.manager.findOneBy(Editora, {id: editora_id})

        //verificando se o foi encontrado algum id no id passado
        if(editora == null){
            return res.status(404).json({ erro: 'Editora inexistente'})
        }

        if(quantidade_exemplares < 0 || exemplares_disponivel < 0){
            return res.status(201).json({erro:'A quantidade de exemplares não pode ser menor que 0'});
        }

        let livro_new = new Livro()
        livro_new.sinopse = sinopse;
        livro_new.isbn = isbn;
        livro_new.titulo = titulo;
        livro_new.quantidade_exemplares = quantidade_exemplares;
        livro_new.ano_publicacao = ano_publicacao;
        livro_new.exemplares_disponivel = exemplares_disponivel;
        livro_new.autor = autor_id;
        livro_new.editora = editora_id;

        const erros = await validate(livro_new);

        if(erros.length > 0){
            return res.status(400).json(erros);
        }

        const livro_new_save = await AppDataSource.manager.save(livro_new)
        return res.status(200).json(livro_new_save);
    }
    
    public async update(req: Request, res: Response){
        const{ cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const livro_id = await AppDataSource.manager.findOneBy(Livro, {id: parseInt(cod)});

        if(livro_id == null) {
            return res.status(404).json({ erro: 'Livro não encontrada!'})
        }

        let { sinopse, isbn, titulo, quantidade_exemplares, ano_publicacao, exemplares_disponivel, autor_id, editora_id } = req.body;

        if(quantidade_exemplares < 0 || exemplares_disponivel < 0){
            return res.status(201).json({erro:'A quantidade de exemplares não pode ser menor que 0'});
        }

        livro_id.sinopse = sinopse;
        livro_id.isbn = isbn;
        livro_id.titulo = titulo;
        livro_id.quantidade_exemplares = quantidade_exemplares;
        livro_id.ano_publicacao = ano_publicacao;
        livro_id.exemplares_disponivel = exemplares_disponivel;
        livro_id.autor = autor_id;
        livro_id.editora = editora_id;
    
        const livro_id_uptd = await AppDataSource.manager.save(livro_id);

        return res.json(livro_id)
    }

    public async destroy(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const livro_id = await AppDataSource.manager.findOneBy(Livro, { id: parseInt(cod) });

        if(livro_id == null){
            return res.status(404).json({ message: 'Livro não encontrado!'})
        }

        await AppDataSource.manager.delete(Livro, livro_id);

        return res.status(204).json();
    }

    public async show(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const livro_id = await AppDataSource.manager.findOneBy(Livro, { id: parseInt(cod)} );

        if(livro_id == null){
            return res.status(404).json({ erro: "Livro não encontrado"})
        }
        return res.json(livro_id);
    }    
}