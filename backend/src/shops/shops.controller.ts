import { Controller, Get } from '@nestjs/common';
import { ShopsService } from "./shops.service";
import { Shop } from "./shop.interface";

@Controller('shops')
export class ShopsController {
    constructor(private shopsService: ShopsService) { }

    @Get()
    getAllShops(): Shop[] {
        return this.shopsService.getAllShops();
    }
}
