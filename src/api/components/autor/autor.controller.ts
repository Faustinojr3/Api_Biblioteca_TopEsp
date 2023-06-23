//FAUSTINO01
import{ validate } from 'class-validator';
import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Autor } from './autor.entity';

export class AutorController {
    //METODO GET - retorna a lista de autores cadastrado no banco
    public async list(req: Request, res: Response){
        
        const autor = await AppDataSource.manager.find(Autor);

        return res.status(200).json({
            Total_Autores: autor.length,
            Autores_Cadastrados: autor
        })
    }

    //METODO POST - cria um novo autor e salva no banco
    public async create(req: Request, res: Response){

        //atribuindo as propriedades do req.body nas variaveis
        let {nome, nacionalidade, data_nascimento, perfil } = req.body;

        //estanciando um objeto da classe Autor e atribuindo os valores do req.body que foram salvas nas variaveis
        let autor_new = new Autor();
        autor_new.nome = nome;
        autor_new.nacionalidade = nacionalidade;
        autor_new.data_nascimento = data_nascimento;
        autor_new.perfil = perfil;
        
        //utilizando o validate para verificar se possui erros na entrada do req.body. Até agora só foi usado o validate no atributo nome (IsNotEmpty) e data_nascimento (IsDateString)
        const erros = await validate(autor_new)

        //retornando a mensagem de erro e não salvando os dados no banco
        if(erros.length > 0){
            return res.status(400).json(erros);
        }

        //salvando o objeto no banco e retornando os dados salvos
        const autor_new_save = await AppDataSource.manager.save(autor_new);

        return res.status(200).json({
            autor_new_save,
            message: 'Novo Autor salvo no Banco de Dados'
        })

    }

    //METODO PUT - atualiza um registro no banco
    public async update(req:Request, res: Response){

        //criando uma constante para receber qual id sera atualizado
        const { cod } = req.params;
        // verificando se o ID passado é um numero
        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        //utilizando o AppDatasource para encontrar o id selecionado e salvando dentro de autor
        const autor_id = await AppDataSource.manager.findOneBy(Autor, {id: parseInt(cod) })

        //verificando se o id foi encontrado - caso tenha sido encontrado autor_atualiz não sera vazio
        if(autor_id == null){
            return res.status(404).json({erro: 'Autor não encontrado!'});
        }

        let {nome, nacionalidade, data_nascimento, perfil } = req.body;

        //atribuindo os novos valores ao autor selecionado pelo id
        autor_id.nome = nome;
        autor_id.nacionalidade = nacionalidade;
        autor_id.data_nascimento = data_nascimento;
        autor_id.perfil = perfil;

        //salvando a atulizacao no banco com o AppDataSource
        const autor_id_updt = await AppDataSource.manager.save(autor_id)

        return res.json({
            autor_id_updt,
            message: 'Autor atualizdo no Banco de Dados'
        });
    }

    //METODO DELETE - deleta um registro no banco
    public async destroy(req: Request, res: Response){

        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const autor_id = await AppDataSource.manager.findOneBy(Autor, { id:parseInt(cod) })

        if(autor_id == null){
            return res.status(404).json({ erro:"Autor não encontrado" });
        }

        await AppDataSource.manager.delete(Autor, autor_id);

        return res.status(204).json()
    }

    //METODO GET- consultado por ID
    public async show(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))) {
            return res.status(400).json({ erro: "Digite um id valido"})
        }

        const autor_id = await AppDataSource.manager.findOneBy(Autor, { id: parseInt(cod)});

        if(autor_id == null){
            return res.status(404).json({ erro: "Autor não encontrado"})
        }

        return res.json(autor_id)
    }
}