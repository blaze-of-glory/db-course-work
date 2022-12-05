import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { ProductDetailsDto } from './dto/product.dto';
import { Provider } from '../providers/provider.entity';
import { Material } from '../materials/material.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product>,
        @InjectRepository(Provider) private providerRepository: Repository<Provider>,
        @InjectRepository(Material) private materialRepository: Repository<Material>
    ) { }

    public getAllProducts(): Promise<Product[]> {
        return this.productRepository.find({relations: ['provider', 'material']});
    }

    public getProductById(id: number): Promise<Product> {
        return this.productRepository.findOne({ where: { id }, relations: ['provider', 'material']});
    }

    public async createProduct(providerId: number, materialId: number, productDetails: ProductDetailsDto): Promise<Product> {
        if (!Object.keys(productDetails).length) {
            return null;
        }

        const provider = await this.providerRepository.findOneBy({ id: providerId });
        const material = await this.materialRepository.findOneBy({ id: materialId });

        if (!provider || !material) {
            throw new HttpException(
                'Provider or material is not found. Cannot create product.',
                HttpStatus.NOT_FOUND
            )
        }

        const newProduct = this.productRepository.create({ ...productDetails, provider: provider, material: material });
        return this.productRepository.save(newProduct);
    }

    public updateProduct(id: number, updatedProductDetails: ProductDetailsDto): Promise<UpdateResult> {
        return this.productRepository.update({ id }, { ...updatedProductDetails });
    }

    public deleteProduct(id: number): Promise<DeleteResult> {
        return this.productRepository.delete({ id });
    }
}
