import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { Employee } from "../../../../shared/interfaces/employee";
import { ApiService } from "../../../../core/api.service";
import { Shop } from "../../../../shared/interfaces/shop";
import { Provider } from "../../../../shared/interfaces/provider";
import { Material } from "../../../../shared/interfaces/material";
import { Product } from "../../../../shared/interfaces/product";
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';

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

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PROVIDERS : {
        this.catalogType = 'providers';
        this.pageTitle = 'Список поставщиков';
        this.buttonText = 'Просмотреть всех';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.MATERIALS : {
        this.catalogType = 'materials';
        this.pageTitle = 'Список материалов';
        this.buttonText = 'Просмотреть все';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.PRODUCTS : {
        this.catalogType = 'products';
        this.pageTitle = 'Список изделий';
        this.buttonText = 'Подробней';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.EMPLOYEES : {
        this.catalogType = 'employees';
        this.pageTitle = 'Список сотрудников';
        this.buttonText = 'Подробней';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.SHOPS : {
        this.catalogType = 'shops';
        this.pageTitle = 'Список магазинов';
        this.getAll();
        break;
      }
    }
  }

  private getAll() {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.PROVIDERS : {
        this.apiService.getAllProviders().subscribe(providers => {
          this.providersList = providers;
        });
        break;
      }
      case ROUTER_NAMES.MATERIALS : {
        this.apiService.getAvailableMaterials(this.route.snapshot.params['provider']).subscribe(materials => {
          this.materialsList = materials;
        });
        break;
      }
      case ROUTER_NAMES.PRODUCTS : {
        this.apiService.getAvailableProducts(this.route.snapshot.params['provider'],this.route.snapshot.params['material']).subscribe(products => {
          this.productsList = products;
        });
        break;
      }
      case ROUTER_NAMES.EMPLOYEES : {
        this.apiService.getAllEmployees().subscribe(employees => {
          this.employeesList = employees;
        });
        break;
      }
      case ROUTER_NAMES.SHOPS : {
        this.apiService.getAllShops().subscribe(shops => {
          this.shopsList = shops;
        });
        break;
      }
    }
  }

  delete(id: string) {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.SHOPS : {
        this.apiService.deleteShop(id).subscribe(() => {
          this.getAll();
        });
      }
    }
  }
}
