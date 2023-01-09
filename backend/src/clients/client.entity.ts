import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from '../payments/payment.entity';
import { Bill } from '../bills/bill.entity';

@Entity({name: 'clients'})
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: '32'})
    name: string;

    @Column({type: 'varchar', length: '32'})
    surname: string;

    @Column({type: 'varchar'})
    img: string;

    @Column({type: 'varchar', length: '128'})
    description: string;

    @Column({type: 'date'})
    registrationDate: string;

    @OneToMany(() => Payment, payment => payment.client)
    payments: Payment[];

    @OneToMany(() => Bill, bill => bill.client)
    bills: Bill[];
}
