import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { Employee } from "../../../../shared/interfaces/employee";
import { ApiService } from "../../../../core/api.service";
import { Pool } from "../../../../shared/interfaces/pool";
import { Client } from "../../../../shared/interfaces/client";
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';
import { ItemService } from "../../../../core/item.service";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public pageTitle!: string;
  public clients!: Client[];
  public employeesList!: Employee[];
  public pools!: Pool[];
  public catalogType!: 'clients' | 'employees' | 'pools';

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private itemService: ItemService
  ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.CLIENTS : {
        this.catalogType = 'clients';
        this.pageTitle = 'Список клиентов';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.EMPLOYEES : {
        this.catalogType = 'employees';
        this.pageTitle = 'Список сотрудников';
        this.getAll();
        break;
      }
      case ROUTER_NAMES.POOLS : {
        this.catalogType = 'pools';
        this.pageTitle = 'Список бассейнов';
        this.getAll();
        break;
      }
    }
  }

  private getAll() {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.CLIENTS : {
        this.apiService.getAllClients().subscribe(clients => {
          this.clients = clients;
        });
        break;
      }
      case ROUTER_NAMES.EMPLOYEES : {
        this.apiService.getAllEmployees().subscribe(employees => {
          this.employeesList = employees;
        });
        break;
      }
      case ROUTER_NAMES.POOLS : {
        this.apiService.getAllPools().subscribe(pools => {
          this.pools = pools;
        });
        break;
      }
    }
  }

  public delete(id: string) {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.POOLS: {
        this.apiService.deletePool(id).subscribe(() => {
          this.getAll();
        });
        break;
      }
      case ROUTER_NAMES.EMPLOYEES: {
        this.apiService.deleteEmployee(id).subscribe(() => {
          this.getAll();
        });
        break;
      }
    }
  }

  public edit(item: any) {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.POOLS: {
        this.itemService.selectedPool = item;
        this.router.navigate([this.ROUTER_LINKS.EDIT + '/pool']);
        break;
      }
      case ROUTER_NAMES.EMPLOYEES: {
        this.itemService.selectedEmployee = item;
        this.router.navigate([this.ROUTER_LINKS.EDIT + '/employee']);
        break;
      }
      case ROUTER_NAMES.CLIENTS: {
        this.itemService.selectedClient = item;
        this.router.navigate([this.ROUTER_LINKS.EDIT + '/client']);
        break
      }
    }
  }

  select(item: any) {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.CLIENTS : {
        this.itemService.selectedClient = item;
        break;
      }
    }
  }
}
