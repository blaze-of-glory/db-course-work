import { Module } from '@nestjs/common';
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { Provider } from '../providers/provider.entity';
import { Material } from '../materials/material.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Provider, Material])],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule { }
