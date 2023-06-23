import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('contato')
export class Contato{
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    rede_social!: string;

    @IsNotEmpty()
    @Column()
    email!: string;

    @Column()
    celular!: string;

    @Column()
    telefone!: string;
}