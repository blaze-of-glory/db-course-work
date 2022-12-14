import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import { Shop } from "./shop.entity";
import { ShopDto } from "./dto/shop.dto";

@Injectable()
export class ShopsService {

    constructor(@InjectRepository(Shop) private shopRepository: Repository<Shop>) { }

    public getAllShops(): Promise<Shop[]> {
        return this.shopRepository.find();
    }

    public getShopById(id: number): Promise<Shop> {
        return this.shopRepository.findOneBy({ id });
    }

    public createShop(shopDetails: ShopDto): Promise<Shop> {
        if (!Object.keys(shopDetails).length) {
            return null;
        }
        const newShop = this.shopRepository.create({ ...shopDetails });
        return this.shopRepository.save(newShop);
    }

    public updateShop(id: number, updateShopDetails: ShopDto): Promise<UpdateResult> {
        return this.shopRepository.update({ id }, { ...updateShopDetails });
    }

    public deleteShop(id: number): Promise<DeleteResult> {
        return this.shopRepository.delete({ id });
    }
}
