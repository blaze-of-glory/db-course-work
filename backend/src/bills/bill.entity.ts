import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from '../clients/client.entity';

@Entity({name: 'bills'})
export class Bill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    img: string;

    @Column({type: 'varchar', length: '64'})
    title: string;

    @Column({type: 'varchar', length: '128'})
    description: string;

    @Column({type: 'smallint', unsigned: true})
    amount: number;

    @ManyToOne(() => Client, client => client.bills)
    client: Client;
}
