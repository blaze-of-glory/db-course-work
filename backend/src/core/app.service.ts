import { Injectable } from '@nestjs/common';
import { AboutUs } from "./interfaces/about-us.interface";
import { Provider } from "./interfaces/provider.interface";
import { Material } from "./interfaces/material.interface";

@Injectable()
export class AppService {
    public getAboutUsData(): AboutUs {
        return {
            id: '1',
            img: 'https://kirmash.by/images/sekcii/juv2/juv2_5.jpg',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, voluptates?'
        }
    }

    public getAllProviders(): Provider[] {
        return [
            {
                id: 'provider-1',
                img: 'https://moto-ac.ru/thumb/2/XH4gRcocPKyjCSuTt-_CiA/r/d/onlata_i_dostavka.jpg',
                title: 'Поставщик 1',
                subTitle: 'Лучшее серебро',
                description: 'Красивое описание'
            }
        ]
    }

    public getAvailableMaterials(): Material[] {
        return [
            {
                id: 'silver',
                img: 'https://wallpapercave.com/wp/wp9805963.jpg',
                title: 'Серебро',
                description: 'Красивое описание'
            }
        ]
    }

}
