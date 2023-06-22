
import { IsDateString, IsInt, IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Autor } from './../autor/autor.entity'
import { Editora } from './../editora/editora.entity'

@Entity('livro')
export class Livro{
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    sinopse!: string;
        
    @IsNotEmpty({
        message: "O campo ISBN deve ser preenchido"
    })
    @Column()
    isbn!: string;

    @IsNotEmpty({
        message: "O campo Titulo deve ser preenchido"
    })
    @Column()
    titulo!: string;

    @IsNumber()
    @IsNotEmpty({
        message: "O campo Quantidade de exemplares deve ser preenchido"
    })
    @IsInt({
        message: "A quantidade de livros deve ser um numero inteiro"
    })
    @Column()
    quantidade_exemplares!: number;

    @IsDateString({strict: true})
    @Column()
    ano_publicacao!: Date;
    
    @IsInt({
        message: "A Quantidade de exemplares disponível deve ser um numero inteiro"
    })

    @Column()
    exemplares_disponivel!: number;

    @ManyToOne(() => Autor, {eager:true})
    @JoinColumn({
        name: 'autor_id',
        referencedColumnName: 'id'
    })
    autor!: Autor;

    @ManyToOne(() => Editora, {eager:true})
    @JoinColumn({
        name: 'editora_id',
        referencedColumnName: 'id'
    })
    editora!: Editora;
}