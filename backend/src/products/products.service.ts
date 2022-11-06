import { Injectable } from '@nestjs/common';
import { Product } from "./product.interface";

@Injectable()
export class ProductsService {
    public getAllProducts(): Product[] {
        return [
            {
                id: '1',
                img: 'https://static.mineralmarket.ru/img/p/477104-1858481.jpg',
                title: 'Цепь',
                description: 'Красивое описание',
                type: 'Цепь',
                provider: 'Поставщик 1',
                material: 'серебро',
                weight: '500',
                cost: '100'
            }
        ];
    }
}
