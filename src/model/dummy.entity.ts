import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dummy {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    dummy: string;
}