import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    public getAllProducts(): Promise<Product[]> {
        return this.productRepository.find();
    }

    public getProductById(id: number): Promise<Product> {
        return this.productRepository.findOneBy({ id });
    }

    public createProduct(productDetails: CreateProductDto): Promise<Product> {
        if (!Object.keys(productDetails).length) {
            return null;
        }
        const newProduct = this.productRepository.create({ ...productDetails });
        return this.productRepository.save(newProduct);
    }

    public updateProduct(id: number, updatedProductDetails: UpdateProductDto): Promise<UpdateResult> {
        return this.productRepository.update({ id }, { ...updatedProductDetails });
    }

    public deleteProduct(id: number): Promise<DeleteResult> {
        return this.productRepository.delete({ id });
    }
}
