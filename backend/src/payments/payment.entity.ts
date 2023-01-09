import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "../clients/client.entity";

@Entity({name: 'payments'})
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: '64'})
    title: string;

    @Column({type: 'varchar', length: '128'})
    description: string;

    @Column({type: 'smallint', unsigned: true})
    amount: number;

    @ManyToOne(() => Client, client => client.payments)
    client: Client;
}
