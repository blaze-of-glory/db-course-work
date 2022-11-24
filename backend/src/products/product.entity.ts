import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: '32'})
    title: string;

    @Column({type: 'varchar'})
    img: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar', length: '32'})
    type: string;

    @Column({type: 'varchar', length: '8'})
    weight: string;

    @Column({type: 'varchar', length: '16'})
    cost: string;

    // @Column({type: 'varchar', length: '32'})
    // provider: string;
    //
    // @Column({type: 'varchar', length: '32'})
    // material: string;
}
