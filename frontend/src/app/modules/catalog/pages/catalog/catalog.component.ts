import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DisplayItem } from "../../../../shared/interfaces/display-item.interface";
import {ROUTER_NAMES} from '../../../../shared/constants/router-names';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public pageTitle!: string;
  public buttonText!: string;
  public displayList!: DisplayItem[];
  private readonly providersListMock: DisplayItem[] = [
    {
      id: 'provider-1',
      img: 'https://moto-ac.ru/thumb/2/XH4gRcocPKyjCSuTt-_CiA/r/d/onlata_i_dostavka.jpg',
      title: 'Поставщик 1',
      subTitle: 'Лучшее золото',
      description: 'Красивое описание'
    },
  ];
  private readonly materialsListMock: DisplayItem[] = [
    {
      id: 'silver',
      img: 'https://wallpapercave.com/wp/wp9805963.jpg',
      title: 'Серебро',
      description: 'Красивое описание'
    }
  ]
  private readonly productsListMock: DisplayItem[] = [
    {
      id: '1',
      img: 'https://static.mineralmarket.ru/img/p/477104-1858481.jpg',
      title: 'Цепь',
      description: 'Красивое описание'
    }
  ];

  private readonly employeesListMock: DisplayItem[] = [
    {
      id: '1',
      img: 'https://fikiwiki.com/uploads/posts/2022-02/1644924565_55-fikiwiki-com-p-kartinki-uspeshnikh-lyudei-56.jpg',
      title: 'Сотрудник',
      description: 'Должность'
    }
  ];

  private readonly shopsListMock: DisplayItem[] = [
    {
      id: '1',
      img: 'http://i3.photo.2gis.com/images/branch/52/7318349400365045_2bc0.jpg',
      title: 'Отделение по адресу Притыцкого 32',
      description: 'с 9 - 21'
    }
  ];



  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PROVIDERS : {
        this.pageTitle = 'Список поставщиков';
        this.displayList = this.providersListMock;
        this.buttonText = 'Просмотреть всех';
        break;
      }
      case ROUTER_NAMES.MATERIALS : {
        this.pageTitle = 'Список материалов';
        this.displayList = this.materialsListMock;
        this.buttonText = 'Просмотреть все';
        break;
      }
      case ROUTER_NAMES.PRODUCTS : {
        this.pageTitle = 'Список изделий';
        this.displayList = this.productsListMock;
        this.buttonText = 'Подробней';
        break;
      }
      case ROUTER_NAMES.EMPLOYEES: {
        this.pageTitle = 'Список сотрудников';
        this.displayList = this.employeesListMock;
        this.buttonText = 'Подробней';
        break;
      }
      case ROUTER_NAMES.SHOPS : {
        this.pageTitle = 'Список магазинов';
        this.displayList = this.shopsListMock;
      }
    }
  }
}
