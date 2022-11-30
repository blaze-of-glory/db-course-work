import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "../providers/provider.entity";
import { Material } from "../materials/material.entity";

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

    @ManyToOne(() => Provider, provider => provider.products)
    provider: Provider;

    @ManyToOne(() => Material, material => material.products)
    material: Material;
}
