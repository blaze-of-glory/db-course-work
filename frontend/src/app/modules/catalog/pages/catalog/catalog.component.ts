import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { Employee } from "../../../../shared/interfaces/employee";
import { ApiService } from "../../../../core/api.service";
import { Shop } from "../../../../shared/interfaces/shop";
import { Provider } from "../../../../shared/interfaces/provider";
import { Material } from "../../../../shared/interfaces/material";
import { Product } from "../../../../shared/interfaces/product";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public pageTitle!: string;
  public buttonText!: string;
  public providersList!: Provider[];
  public materialsList!: Material[];
  public productsList!: Product[];
  public employeesList!: Employee[];
  public shopsList!: Shop[];
  public catalogType!: 'providers' | 'materials' | 'products' | 'employees' | 'shops';

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
        this.apiService.getAvailableMaterials(this.route.snapshot.params['provider']).subscribe(materials => {
          this.catalogType = 'materials';
          this.pageTitle = 'Список материалов';
          this.materialsList = materials;
          this.buttonText = 'Просмотреть все';
        });
        break;
      }
      case ROUTER_NAMES.PRODUCTS : {
        this.apiService.getAvailableProducts(this.route.snapshot.params['provider'],this.route.snapshot.params['material']).subscribe(products => {
          this.catalogType = 'products';
          this.pageTitle = 'Список изделий';
          this.productsList = products;
          this.buttonText = 'Подробней';
        });
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
