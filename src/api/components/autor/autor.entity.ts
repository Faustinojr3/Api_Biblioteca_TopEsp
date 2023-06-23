//FAUSTINO01
import { IsNotEmpty, IsDateString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('autor')
export class Autor {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty({
        message: 'O atributo nome não pode estar vazio'
    })
    @Column()
    nome!: string;

    @Column()
    nacionalidade!: string;

    @IsDateString({strict: true})
    @Column()
    data_nascimento!: Date;
        
    @Column()
    perfil!: string;
}