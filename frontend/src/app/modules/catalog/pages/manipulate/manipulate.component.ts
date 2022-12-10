import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from "../../../../core/api.service";
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';
import { ItemService } from "../../../../core/item.service";
import { Location } from '@angular/common'

@Component({
  selector: 'app-manipulate',
  templateUrl: './manipulate.component.html',
  styleUrls: ['./manipulate.component.scss']
})
export class ManipulateComponent implements OnInit {
  title!: string;
  instance!: 'employee' | 'shop' | 'provider' | 'material' | 'product';
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private itemService: ItemService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.params['instance']) {
      case 'employee' : {
        this.availabilityChecker(this.itemService.selectedEmployee);
        this.title = 'Добавить нового сотрудника';
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
      case 'shop' : {
        this.availabilityChecker(this.itemService.selectedShop);
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление нового магазина' : 'Редактирование магазина';
        this.instance = 'shop';
        this.form = this.fb.group({
          img: [this.itemService.selectedShop?.img, [Validators.required]],
          address: [this.itemService.selectedShop?.address, [Validators.required]],
          openTime: [this.itemService.selectedShop?.openTime, [Validators.required]],
          closeTime: [this.itemService.selectedShop?.closeTime, [Validators.required]]
        });
        break;
      }
      case 'provider' : {
        this.availabilityChecker(this.itemService.selectedProvider);
        this.title = 'Добавление нового поставщика';
        this.instance = 'provider';
        this.form = this.fb.group({
          img: [this.itemService.selectedProvider?.img, [Validators.required]],
          title: [this.itemService.selectedProvider?.title, [Validators.required]],
          subtitle: [this.itemService.selectedProvider?.subTitle, [Validators.required]],
          description: [this.itemService.selectedProvider?.description, [Validators.required]],
          foundingDate: [this.itemService.selectedProvider?.foundingDate, [Validators.required]]
        });
        break;
      }
      case 'material' : {
        this.availabilityChecker(this.itemService.selectedMaterial,this.itemService.selectedProvider, this.itemService.selectedMaterial);
        this.title = 'Добавление нового материала';
        this.instance = 'material';
        this.form = this.fb.group({
          img: [this.itemService.selectedMaterial?.img, [Validators.required]],
          title: [this.itemService.selectedMaterial?.title, [Validators.required]],
          description: [this.itemService.selectedMaterial?.description, [Validators.required]]
        });
        break;
      }
      case 'product' : {
        this.availabilityChecker(this.itemService.selectedProduct,this.itemService.selectedProvider, this.itemService.selectedMaterial);
        this.title = 'Добавление нового товара';
        this.instance = 'product';
        this.form = this.fb.group({
          img: [this.itemService.selectedProduct?.img, [Validators.required]],
          title: [this.itemService.selectedProduct?.title, [Validators.required]],
          description: [this.itemService.selectedProduct?.description, [Validators.required]],
          type: [this.itemService.selectedProduct?.type, [Validators.required]],
          weight: [this.itemService.selectedProduct?.weight, [Validators.required]],
          cost: [this.itemService.selectedProduct?.cost, [Validators.required]]
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
      case 'shop': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createShop(this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editShop(this.itemService.selectedShop.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'provider': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createProvider(this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editProvider(this.itemService.selectedProvider.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'material': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          const materialData = {
            materialDetails: this.form.value,
            providerId: this.itemService.selectedProvider.id
          }
          this.apiService.createMaterial(materialData).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editMaterial(this.itemService.selectedMaterial.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
        break;
      }
      case 'product': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          const productData = {
            productDetails: this.form.value,
            providerId: this.itemService.selectedProvider.id,
            materialId: this.itemService.selectedMaterial.id
          }
          this.apiService.createProduct(productData).subscribe(() => {
            this.goBackToAll(this.form);
          });
        } else {
          this.apiService.editProduct(this.itemService.selectedProduct.id, this.form.value).subscribe(() => {
            this.goBackToAll(this.form);
          })
        }
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
      this.router.navigate([ROUTER_LINKS.HOME])
    }

    if (this.route.routeConfig?.path === ROUTER_NAMES.EDIT && !instance) {
      this.router.navigate([ROUTER_LINKS.HOME])
    }
  }
}
