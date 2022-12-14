import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Material } from '../materials/material.entity';

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

    @Column({type: 'date'})
    foundingDate: string;

    @OneToMany(() => Product, product => product.provider)
    products: Product[];

    @ManyToMany(() => Material, material => material.providers)
    @JoinTable()
    materials: Material[];
}
