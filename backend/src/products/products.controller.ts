import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { Product } from "./product.entity";
import { ProductDetailsDto, ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) { }

    @Get()
    getAllProducts(): Promise<Product[]> {
        return this.productsService.getAllProducts();
    }

    @Get('filter')
    getFilteredProducts(@Query() query: {providerId: number, materialId: number}, ) {
        return this.productsService.getFilteredProducts(query.providerId, query.materialId);
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() productDto: ProductDto): Promise<Product> {
        return this.productsService.createProduct(productDto.providerId, productDto.materialId, productDto.productDetails);
    }

    @Put(':id')
    async updateProductById(@Param('id', ParseIntPipe) id: number, @Body() updatedProductDetailsDto: ProductDetailsDto): Promise<Product> {
        await this.productsService.updateProduct(id, updatedProductDetailsDto);
        return this.productsService.getProductById(id);
    }

    @Delete(':id')
    async deleteProductById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.productsService.deleteProduct(id);
        return HttpStatus.ACCEPTED;
    }

}
