import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../../../shared/interfaces/product";
import { Employee } from "../../../../shared/interfaces/employee";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ApiService } from "../../../../core/api.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{

  private readonly productMock: Product = {
    "id": "1",
    "img": "https://static.mineralmarket.ru/img/p/477104-1858481.jpg",
    "title": "Цепь",
    "description": "Красивое описание",
    "type": "Цепь",
    "provider": "Поставщик 1",
    "material": "серебро",
    "weight": "500",
    "cost": "100"
  };

  product!: Product;
  employee!: Employee;
  itemType!: 'product' | 'employee';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {  }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PRODUCT : {
        this.itemType = 'product';
        this.product = this.productMock;
        break;
      }
      case ROUTER_NAMES.EMPLOYEE : {
        this.itemType = 'employee';
        this.apiService.getEmployeeById(this.route.snapshot.params['employee']).subscribe(selectedEmployee => {
          this.employee = selectedEmployee;
        });
        break;
      }
    }
  }
}
