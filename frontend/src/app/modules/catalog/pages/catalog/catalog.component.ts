import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DisplayItem } from "../../../../shared/interfaces/display-item";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { Employee } from "../../../../shared/interfaces/employee";
import { ApiService } from "../../../../core/api.service";
import { Shop } from "../../../../shared/interfaces/shop";
import {Provider} from "../../../../shared/interfaces/provider";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public pageTitle!: string;
  public buttonText!: string;
  public providersList!: Provider[];
  public employeesList!: Employee[];
  public shopsList!: Shop[];
  public catalogType!: 'providers' | 'materials' | 'products' | 'employees' | 'shops';
  public displayList!: DisplayItem[];
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PROVIDERS : {
        this.apiService.getAllProviders().subscribe(providers => {
          this.catalogType = 'providers';
          this.pageTitle = 'Список поставщиков';
          this.providersList = providers;
          this.buttonText = 'Просмотреть всех';
        });
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
      case ROUTER_NAMES.EMPLOYEES : {
        this.apiService.getAllEmployees().subscribe(employees => {
          this.catalogType = 'employees';
          this.pageTitle = 'Список сотрудников';
          this.employeesList = employees;
          this.buttonText = 'Подробней';
        });
        break;
      }
      case ROUTER_NAMES.SHOPS : {
        this.apiService.getAllShops().subscribe(shops => {
          this.catalogType = 'shops';
          this.pageTitle = 'Список магазинов';
          this.shopsList = shops;
        });
        break;
      }
    }
  }
}
