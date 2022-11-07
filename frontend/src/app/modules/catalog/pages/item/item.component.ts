import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../../../shared/interfaces/product.interface";
import { Employee } from "../../../../shared/interfaces/employee";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

  private readonly productMock: Product = {
    id: '1',
    img: 'https://data2.1freewallpapers.com/detail/mountain-lake-beautiful-night.jpg',
    type: 'Цепь',
    name: 'Цепь Арго',
    provider: 'Поставщик 1',
    material: 'серебро',
    weight: '500',
    cost: '100'
  };

  private readonly employeesMock: Employee = {
    id: '1',
    img: 'https://data2.1freewallpapers.com/detail/mountain-lake-beautiful-night.jpg',
    name: 'Joe',
    surname: 'Doe',
    age: '42',
    position: 'Regular',
    salary: '300'
  };

  product!: Product;
  employee!: Employee;
  itemType!: 'product' | 'employee';

  constructor(private route: ActivatedRoute) {  }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PRODUCT : {
        this.itemType = 'product';
        this.product = this.productMock;
        break;
      }
      case ROUTER_NAMES.EMPLOYEE : {
        this.itemType = 'employee';
        this.employee = this.employeesMock;
        break;
      }
    }
  }
}
