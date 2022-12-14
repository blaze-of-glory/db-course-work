import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'employees'})
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    img: string;

    @Column({type: 'varchar', length: '32'})
    name: string;

    @Column({type: 'varchar', length: '32'})
    surname: string;

    @Column({type: 'tinyint'})
    age: number;

    @Column({type: 'varchar', length: '64'})
    position: string;

    @Column({type: 'smallint'})
    salary: number;
}
