import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ShopsService } from "./shops.service";
import { Shop } from "./shop.entity";
import { ShopDto } from "./dto/shop.dto";

@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService) { }

    @Get()
    getAllShops(): Promise<Shop[]> {
        return this.shopsService.getAllShops();
    }

    @Post()
    createShop(@Body() createShopDto: ShopDto): Promise<Shop> {
        return this.shopsService.createShop(createShopDto);
    }

    @Put(':id')
    async updateShopById(@Param('id', ParseIntPipe) id: number, @Body() updateShopDto: ShopDto): Promise<Shop> {
       await this.shopsService.updateShop(id,updateShopDto);
       return this.shopsService.getShopById(id);
    }

    @Delete(':id')
    async deleteShopById(@Param('id', ParseIntPipe) id: number): Promise<HttpStatus.ACCEPTED> {
        await this.shopsService.deleteShop(id);
        return HttpStatus.ACCEPTED;
    }
}
