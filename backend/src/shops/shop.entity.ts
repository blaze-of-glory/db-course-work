import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'shops'})
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    img: string;

    @Column({type: 'varchar', length: '64'})
    address: string;

    @Column({type: 'varchar', length: '6'})
    openTime: string;

    @Column({type: 'varchar', length: '6'})
    closeTime: string;
}
