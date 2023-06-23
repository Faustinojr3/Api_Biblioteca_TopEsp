import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";
import { Collection, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Livro } from '../livro/livro.entity';
import { Pessoa } from '../pessoa/pessoa.entity';

@Entity('emprestimo')
export class Emprestimo{
    @PrimaryGeneratedColumn()
    id!: number;

    @IsDateString()
    @IsNotEmpty()
    @Column()
    data_hora_solicitacao!: string;

    @IsDateString()
    @IsNotEmpty()
    @Column()
    data_hora_emprestimo!: string;

    @IsDateString()
    @Column()
    data_previsao_entrega!: string;

    @IsDateString()
    @Column()
    data_entregue!: string;
 
    @Column()
    qtd_emprestada!: number;
    
    @ManyToOne(() => Livro, {eager:true})
    @JoinColumn({
        name: 'livro_id',
        referencedColumnName: 'id'
    })
    livro!: Livro;

    @ManyToOne(() => Pessoa, {eager:true})
    @JoinColumn({
        name: 'Pessoa_id',
        referencedColumnName: 'id'
    })
    pessoa!: Pessoa;    
}