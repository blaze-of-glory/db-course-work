import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../../core/api.service";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ItemService } from "../../../../core/item.service";
import { Location } from '@angular/common'

@Component({
  selector: 'app-manipulate',
  templateUrl: './manipulate.component.html',
  styleUrls: ['./manipulate.component.scss']
})
export class ManipulateComponent implements OnInit, OnDestroy{
  title!: string;
  instance!: 'employee' | 'shop' | 'provider' | 'material' | 'product';
  employeeForm!: FormGroup;
  shopForm!: FormGroup;
  providerForm!: FormGroup;
  materialForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private itemService: ItemService,
    private location: Location
    ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.params['instance']) {
      case 'employee' : {
        this.title = 'Добавить нового сотрудника';
        this.instance = 'employee';
        this.employeeForm = this.fb.group({
          img: [this.itemService.selectedEmployee?.img, [Validators.required]],
          name: [this.itemService.selectedEmployee?.name, [Validators.required]],
          surname: [this.itemService.selectedEmployee?.surname, [Validators.required]],
          age: [this.itemService.selectedEmployee?.age, [Validators.required]],
          position: [this.itemService.selectedEmployee?.position, [Validators.required]],
          salary: [this.itemService.selectedEmployee?.salary, [Validators.required]]
        });
        break;
      }
      case 'shop' : {
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление нового магазина' : 'Редактирование магазина';
        this.instance = 'shop';
        this.shopForm = this.fb.group({
          img: [this.itemService.selectedShop?.img, [Validators.required]],
          address: [this.itemService.selectedShop?.address, [Validators.required]],
          openTime: [this.itemService.selectedShop?.openTime, [Validators.required]],
          closeTime: [this.itemService.selectedShop?.closeTime, [Validators.required]]
        });
        break;
      }
      case 'provider' : {
        this.title = 'Добавление нового поставщика';
        this.instance = 'provider';
        this.providerForm = this.fb.group({
          img: [this.itemService.selectedProvider?.img, [Validators.required]],
          title: [this.itemService.selectedProvider?.title, [Validators.required]],
          subtitle: [this.itemService.selectedProvider?.subTitle, [Validators.required]],
          description: [this.itemService.selectedProvider?.description, [Validators.required]],
          foundingDate: [this.itemService.selectedProvider?.foundingDate, [Validators.required]]
        });
        break;
      }
      case 'material' : {
        this.title = 'Добавление нового материала';
        this.instance = 'material';
        this.materialForm = this.fb.group({
          img: [this.itemService.selectedMaterial?.img, [Validators.required]],
          title: [this.itemService.selectedMaterial?.title, [Validators.required]],
          description: [this.itemService.selectedMaterial?.description, [Validators.required]]
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.itemService.selectedProvider = null;
    this.itemService.selectedShop = null;
    this.itemService.selectedEmployee = null;
  }

  public manipulate(): void {
    switch (this.instance) {
      case 'employee': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createEmployee(this.employeeForm.value).subscribe(() => {
            this.goBackToAll(this.employeeForm);
          });
        } else {
          this.apiService.editEmployee(this.itemService.selectedEmployee.id, this.employeeForm.value).subscribe(() => {
            this.goBackToAll(this.employeeForm);
          })
        }
        break;
      }
      case 'shop': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createShop(this.shopForm.value).subscribe(() => {
            this.goBackToAll(this.shopForm);
          });
        } else {
          this.apiService.editShop(this.itemService.selectedShop.id, this.shopForm.value).subscribe(() => {
            this.goBackToAll(this.shopForm);
          })
        }
        break;
      }
      case 'provider': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createProvider(this.providerForm.value).subscribe(() => {
            this.goBackToAll(this.providerForm);
          });
        } else {
          this.apiService.editProvider(this.itemService.selectedProvider.id, this.providerForm.value).subscribe(() => {
            this.goBackToAll(this.providerForm);
          })
        }
        break;
      }
      case 'material': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          const materialData = {
            materialDetails : this.materialForm.value,
            providerId: this.itemService.selectedProvider.id
          }
          this.apiService.createMaterial(materialData).subscribe(() => {
            this.goBackToAll(this.materialForm)
          });
        } else {
          this.apiService.editMaterial(this.itemService.selectedMaterial.id, this.materialForm.value).subscribe(() => {
            this.goBackToAll(this.materialForm);
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
}
