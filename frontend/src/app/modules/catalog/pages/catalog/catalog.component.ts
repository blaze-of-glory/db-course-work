import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DisplayItem } from "../../../../shared/interfaces/display-item.interface";
import {ROUTER_NAMES} from '../../../../core/constants/router-names';

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
      title: 'Поставщик 1',
      subTitle: 'Лучшее золото',
      description: 'Красивое описание'
    },
  ];
  private readonly materialsListMock: DisplayItem[] = [
    {
      id: 'silver',
      title: 'Серебро',
      description: 'Красивое описание'
    }
  ]
  private readonly productsListMock: DisplayItem[] = [
    {
      id: '1',
      title: 'Цепь',
      description: 'Красивое описание'
    }
  ];

  private readonly employeesListMock: DisplayItem[] = [
    {
      id: '1',
      title: 'Сотрудник',
      description: 'Должность'
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
    }
  }
}
