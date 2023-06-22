import { IsDateString, IsNotEmpty } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Contato } from "../contato/contato.entity";
import { Endereco } from "../endereco/endereco.entity";

@Entity('pessoa')
export class Pessoa{
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty({
        message: 'O atributo nome não pode estar vazio'
    })
    @Column()
    nome!: string;

    @IsNotEmpty({
        message: 'O atributo cpf não pode estar vazio'
    })
    @Column()
    cpf!: string

    @IsNotEmpty({
        message: 'O atributo nome não RG estar vazio'
    })
    @Column()
    rg!: string
    
    @IsDateString({ strict: true })
    @Column()
    data_nascimento!: Date;

    @Column()
    sexo!: string;
    
    @ManyToOne(()=> Contato, {eager: true})
    @JoinColumn({
        name: 'contato_id',
        referencedColumnName: 'id'
    })
    contato!: Contato;

    @ManyToOne(()=> Endereco, {eager: true})
    @JoinColumn({
        name: 'endereco_id',
        referencedColumnName: 'id'
    })
    endereco!: Endereco;
}