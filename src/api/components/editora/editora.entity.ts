import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('editora')
export class Editora {
    @PrimaryGeneratedColumn()
    id!: number;

    @IsNotEmpty({
        message: 'O campo Razão Social não pode estar vazio'
    })
    @Column()
    razao_social!: string;

    @Column()
    nome_fantasia!: string;
 
    @IsNotEmpty({
        message: 'O CNPJ não pode ser nulo'
    })
    @Column()
    cnpj!: string;
}