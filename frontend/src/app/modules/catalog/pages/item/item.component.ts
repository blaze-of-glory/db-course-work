import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../../../../shared/interfaces/product";
import { Employee } from "../../../../shared/interfaces/employee";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ApiService } from "../../../../core/api.service";
import { ItemService } from '../../../../core/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  product!: Product;
  employee!: Employee;
  itemType!: 'product' | 'employee';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private itemService: ItemService,
  ) {  }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PRODUCT : {
        this.itemType = 'product';
        this.product = this.itemService.selectedProduct;
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
