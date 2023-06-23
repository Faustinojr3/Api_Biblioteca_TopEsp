import { Request, Response } from 'express';
import { AppDataSource } from '../../../config/database/mysql-datasource.config';
import { Emprestimo } from '../emprestimo/emprestimo.entity';
import { Livro } from '../livro/livro.entity';
import { Pessoa } from '../pessoa/pessoa.entity';
import { validate } from 'class-validator';
import { App } from '../../../app';


export class EmprestimoController{
    public async list(req: Request, res: Response){
        const emprestimo = await AppDataSource.manager.find(Emprestimo);

        return res.status(200).json({
            Total_Emprestimos : emprestimo.length,
            Emprestimos_Cadastrados : emprestimo
        })
    }

    public async create(req: Request, res: Response){
        let { data_hora_solicitacao, data_hora_emprestimo, qtd_emprestada, livro_id, pessoa_id } = req.body;

        if(livro_id == undefined){
            return res.status(404).json({ erro: 'Livro inexistente'});
        }

        const livro = await AppDataSource.manager.findOneBy(Livro, {id: livro_id})

        if(livro == null){
            return res.status(404).json({ erro:'livro não encontrado' })
        }

        if(pessoa_id == undefined){
            return res.status(404).json({ erro: 'Pessoa inexistente'});
        }

        const pessoa = await AppDataSource.manager.findOneBy(Pessoa, {id: pessoa_id})

        if(pessoa == null){
            return res.status(404).json({ erro:'Pessoa não encontrada' })
        }

        if(livro.exemplares_disponivel < qtd_emprestada){
            return res.status(201).json({ erro:'Quantidade indisponível' }) 
        }

        if(data_hora_solicitacao == ""){
            return res.status(400).json({erro: 'O campo data e hora da solicitao deve ser prenchida'})
        }
        if(data_hora_emprestimo == ""){
            return res.status(400).json({erro: 'O campo data e hora do emprestimo deve ser prenchida'})
        }
        if(qtd_emprestada == "" || qtd_emprestada < 0){
            return res.status(400).json({erro: 'O campo qtd de emprestimo deve ser prenchida com o valor maior que zero'})
        }

        function getCurrentDate(): Date {
            return new Date();
        }
        console.log(getCurrentDate.toString);
        const currentDate = getCurrentDate().toISOString().slice(0,10);        
        console.log(currentDate);
        if(data_hora_emprestimo < currentDate){
            return res.status(201).json({ erro: 'A data de emprestimo nao pode ser menor que a data de hoje '+ currentDate })
        }
        console.log(currentDate)

        //pegando a data do req.body e armazenando dentro da costante 
        const _data_hora_emprestimo = new Date(req.body.data_hora_emprestimo);
        //somando + 7 dias a data do emprestimo
        const _data_previsao_entrega = new Date(_data_hora_emprestimo.getTime()+7*24*60*60*1000);
        const data_devolucao = _data_previsao_entrega.toISOString().slice(0,10);
        

        let emprestimo_new = new Emprestimo()
        emprestimo_new.data_hora_solicitacao = data_hora_solicitacao;
        emprestimo_new.data_hora_emprestimo = data_hora_emprestimo;
        emprestimo_new.data_previsao_entrega = data_devolucao
        emprestimo_new.qtd_emprestada = qtd_emprestada;
        emprestimo_new.livro = livro_id;
        emprestimo_new.pessoa = pessoa_id;
        emprestimo_new.data_entregue = "1900-01-01";

        const erros = await validate(emprestimo_new);

        if(erros.length > 0){
            return res.status(400).json(erros)
        }

        livro.exemplares_disponivel -= qtd_emprestada;

        await AppDataSource.manager.save(livro);
        
        await AppDataSource.manager.save(emprestimo_new);

        return res.status(201).json({
            emprestimo_new_save:{
                data_hora_solicitacao,
                data_hora_emprestimo,
                data_devolucao,
                qtd_emprestada,
                livro,
                pessoa
            }
        });
    }

    public async update(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))){
            return res.status(400).json({ message: "O id deve ser um numero"});
        }

        const emprestimo_id = await AppDataSource.manager.findOneBy(Emprestimo, { id:parseInt(cod) });

        if(emprestimo_id == null){
            return res.status(404).json({ erro: 'Emprestimo não encontrado'});
        }
        

        let { data_hora_solicitacao, data_hora_emprestimo, data_previsao_entrega, data_entregue, qtd_emprestimo_devolvido, livro_id, pessoa_id } = req.body;

        if(qtd_emprestimo_devolvido <= 0){
            return res.status(201).json({ message: 'A devolucao deve ser maior que 0'})
        }
        if(!Number.isInteger(qtd_emprestimo_devolvido)){
            return res.status(201).json({ message: 'A devolucao deve ser um numero inteiro'})
        }

        if(qtd_emprestimo_devolvido > emprestimo_id.qtd_emprestada){   
            return res.status(201).json({ erro:'O valor devolvido não  pode ser maior que o valor tomado no emprestimo'});
        }

        if(livro_id != emprestimo_id.livro.id){
            return res.status(201).json({ erro: 'o livro devolvido é diferente do livro emprestado'})
        }
    
        emprestimo_id.data_hora_solicitacao = data_hora_solicitacao,
        emprestimo_id.data_hora_emprestimo = data_hora_emprestimo,
        emprestimo_id.data_previsao_entrega = data_previsao_entrega,
        emprestimo_id.data_entregue = data_entregue,   
        emprestimo_id.qtd_emprestada -= qtd_emprestimo_devolvido,
        emprestimo_id.livro = livro_id,
        emprestimo_id.pessoa = pessoa_id;
        
        const livro = await AppDataSource.manager.findOneBy(Livro, {id:livro_id});
        livro.exemplares_disponivel += qtd_emprestimo_devolvido  
        await AppDataSource.manager.save(livro);
        const erros = await validate(emprestimo_id);

        if(erros.length > 0){
            return res.status(400).json(erros)
        }
        const emprestimo_id_updt = await AppDataSource.manager.save(emprestimo_id);
        
        return res.status(200).json({emprestimo_id_updt})
    }

    public async show(req: Request, res: Response){
        const { cod } = req.params;

        if(!Number.isInteger(parseInt(cod))) {
          return res.status(400).json();
        }

        const emprestimo_id = await AppDataSource.manager.findOneBy(Emprestimo, { id: parseInt(cod) });

        if(emprestimo_id == null){
            return res.status(404).json({ erro: 'Emprestimo não encontrado!'})
        }

        return res.json(emprestimo_id);
    }
}
