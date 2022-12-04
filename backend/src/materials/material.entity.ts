import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Provider } from '../providers/provider.entity';

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

    @ManyToMany(() => Provider, provider => provider.materials)
    providers: Provider[];
}
