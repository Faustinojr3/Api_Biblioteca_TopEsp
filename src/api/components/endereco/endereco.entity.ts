import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('endereco')
export class Endereco{
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty({
        message:'o atributo numero nao pode estar vazio'
    })
    @Column()
    numero!: string;

    @IsNotEmpty()
    @Column()
    bairro!: string;

    @IsNotEmpty({
        message: 'O atributo não pode estar vazio'
    })
    @Column()
    cidade!: string;

    @IsNotEmpty()
    @Column()
    estado!: string;

    @IsNotEmpty()
    @Column()
    cep!: string;

    @IsNotEmpty()
    @Column()
    rua!: string;

    @IsNotEmpty()
    @Column()
    pais!: string;

    @Column()
    complemento!: string;

}