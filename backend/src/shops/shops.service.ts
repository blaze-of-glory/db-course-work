import { Injectable } from '@nestjs/common';
import { Shop } from "./shop.interface";

@Injectable()
export class ShopsService {
    public getAllShops(): Shop[] {
        return [
            {
                id: '1',
                img: 'http://i3.photo.2gis.com/images/branch/52/7318349400365045_2bc0.jpg',
                address: 'Притыцкого 32',
                openTime: '9',
                closeTime: '21'
            }
        ]
    }
}
