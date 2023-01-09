import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "../../../../core/api.service";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ItemService } from "../../../../core/item.service";
import { Location } from '@angular/common'
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';

@Component({
  selector: 'app-manipulate',
  templateUrl: './manipulate.component.html',
  styleUrls: ['./manipulate.component.scss']
})
export class ManipulateComponent implements OnInit {
  title!: string;
  instance!: 'employee' | 'pool' | 'client' | 'payment' | 'bill';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private itemService: ItemService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.params['instance']) {
      case 'employee' : {
        this.availabilityChecker(this.itemService.selectedEmployee);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавить нового сотрудника' : 'Редактировать сотрудника';
        this.instance = 'employee';
        this.form = this.fb.group({
          img: [this.itemService.selectedEmployee?.img, [Validators.required]],
          name: [this.itemService.selectedEmployee?.name, [Validators.required]],
          surname: [this.itemService.selectedEmployee?.surname, [Validators.required]],
          age: [this.itemService.selectedEmployee?.age, [Validators.required]],
          position: [this.itemService.selectedEmployee?.position, [Validators.required]],
          salary: [this.itemService.selectedEmployee?.salary, [Validators.required]]
        });
        break;
      }
      case 'pool' : {
        this.availabilityChecker(this.itemService.selectedPool);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление нового бассейна' : 'Редактирование бассейна';
        this.instance = 'pool';
        this.form = this.fb.group({
          img: [this.itemService.selectedPool?.img, [Validators.required]],
          address: [this.itemService.selectedPool?.address, [Validators.required]],
          openTime: [this.itemService.selectedPool?.openTime, [Validators.required]],
          closeTime: [this.itemService.selectedPool?.closeTime, [Validators.required]]
        });
        break;
      }
      case 'client' : {
        this.availabilityChecker(this.itemService.selectedClient);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление нового клиента' : 'Редактирование клиента';
        this.instance = 'client';
        this.form = this.fb.group({
          img: [this.itemService.selectedClient?.img, [Validators.required]],
          name: [this.itemService.selectedClient?.name, [Validators.required]],
          surname: [this.itemService.selectedClient?.surname, [Validators.required]],
          description: [this.itemService.selectedClient?.description, [Validators.required]],
          registrationDate: [this.itemService.selectedClient?.registrationDate, [Validators.required]]
        });
        break;
      }
      case 'payment' : {
        this.availabilityChecker(this.itemService.selectedPayment);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление платежа' : 'Редактирование платежа';
        this.instance = 'payment';
        this.form = this.fb.group({
          title: [this.itemService.selectedPayment?.title, [Validators.required]],
          description: [this.itemService.selectedPayment?.description, [Validators.required]],
          amount: [this.itemService.selectedPayment?.amount, [Validators.required]]
        });
        break;
      }
      case 'bill' : {
        this.availabilityChecker(this.itemService.selectedBill);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Выставление счёта' : 'Редактирование счёта';
        this.instance = 'bill';
        this.form = this.fb.group({
          title: [this.itemService.selectedBill?.title, [Validators.required]],
          description: [this.itemService.selectedBill?.description, [Validators.required]],
          amount: [this.itemService.selectedBill?.amount, [Validators.required]]
        });
        break;
      }
    }

    if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
      this.form.reset();
    }
  }

  public manipulate(): void {
    switch (this.instance) {
      case 'employee': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createEmployee(this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editEmployee(this.itemService.selectedEmployee.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'pool': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createPool(this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editPool(this.itemService.selectedPool.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'client': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createClient(this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editClient(this.itemService.selectedClient.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'payment': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createPayment(this.itemService.selectedClient.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editPayment(this.itemService.selectedPayment.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'bill': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createBill(this.itemService.selectedClient.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editBill(this.itemService.selectedPayment.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      }
  }

  public goBackToAll(form: FormGroup) {
    form.reset();
    this.location.back();
  }

  public isFormInvalid(form: FormGroup): boolean {
    return form.invalid;
  }

  private availabilityChecker(instance: any, provider: any = true, material: any = true) {
    if (this.route.routeConfig?.path === ROUTER_NAMES.ADD && !provider && !material) {
       this.router.navigate([ROUTER_LINKS.CLIENTS]);
    }

    if (this.route.routeConfig?.path === ROUTER_NAMES.EDIT && !instance) {
       this.router.navigate([ROUTER_LINKS.CLIENTS]);
    }
  }
}
