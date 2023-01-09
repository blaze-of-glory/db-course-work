import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Employee } from "../../../../shared/interfaces/employee";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ApiService } from "../../../../core/api.service";
import { Client } from '../../../../shared/interfaces/client';
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit{
  client!: Client;
  employee!: Employee;
  itemType!: 'client' | 'employee';

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {  }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig?.path) {
      case ROUTER_NAMES.CLIENT : {
        console.log(this.route.snapshot.params['client']);
        this.itemType = 'client';
        this.getClient();
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

  public getClient() {
    this.apiService.getClientById(this.route.snapshot.params['client']).subscribe(selectedClient => {
      this.client = selectedClient;
    });
  }

  public delete (type: 'payment' | 'bill', id: string) {
    switch (type) {
      case 'bill': return this.apiService.deleteBill(id).subscribe( () => this.getClient());
      case 'payment': return this.apiService.deletePayment(id).subscribe( () => this.getClient());
    }
  }
}
