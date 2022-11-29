import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";

@Entity({name: 'providers'})
export class Provider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: '32'})
    title: string;

    @Column({type: 'varchar', length: '64'})
    subtitle: string;

    @Column({type: 'varchar'})
    img: string;

    @Column({type: 'varchar'})
    description: string;

    @Column({type: 'varchar', length: '32'})
    foundingDate: string;

    @OneToMany(() => Product, product => product.provider)
    products: Product[]
}
