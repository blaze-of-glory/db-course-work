import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { ProductsQueryDto } from "../core/dto/productsQuery.dto";
import { Product } from "./product.interface";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAllProducts(@Query() query: ProductsQueryDto): Product[] {
        if (!query.provider || !query.material) {
            throw new BadRequestException('Provider or material is missing');
        }
        return this.productsService.getAllProducts();
    }
}
