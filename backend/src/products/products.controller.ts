import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { Product } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.createProduct(createProductDto);
    }

    @Put(':id')
    async updateProductById(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        await this.productsService.updateProduct(id, updateProductDto);
        return this.productsService.getProductById(id);
    }

    @Delete(':id')
    async deleteProductById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.productsService.deleteProduct(id);
        return HttpStatus.ACCEPTED;
    }

}
