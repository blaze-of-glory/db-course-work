import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";

@Entity({name: 'materials'})
export class Material {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    img: string;

    @Column({type: 'varchar', length: '32'})
    title: string;

    @Column({type: 'varchar'})
    description: string;

    @OneToMany(() => Product, product => product.material)
    products: Product[];
}
