import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../../core/api.service";
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';
import { ROUTER_NAMES } from '../../../../shared/constants/router-names';
import { ItemService } from "../../../../core/item.service";

@Component({
  selector: 'app-manipulate',
  templateUrl: './manipulate.component.html',
  styleUrls: ['./manipulate.component.scss']
})
export class ManipulateComponent implements OnInit, OnDestroy{
  title!: string;
  instance!: 'employee' | 'shop' | 'product';
  employeeForm!: FormGroup;
  shopForm!: FormGroup;

  public readonly ROUTER_LINKS = ROUTER_LINKS;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private itemService: ItemService
    ) { }

  ngOnInit(): void {
    switch (this.route.snapshot.params['instance']) {
      case 'shop' : {
        this.title = this.route.routeConfig?.path === ROUTER_NAMES.ADD ? 'Добавление нового магазина' : 'Редактирование магазина';
        this.instance = 'shop';
        this.shopForm = this.fb.group({
          img: [this.itemService.currentShop?.img, [Validators.required]],
          address: [this.itemService.currentShop?.address, [Validators.required]],
          openTime: [this.itemService.currentShop?.openTime, [Validators.required]],
          closeTime: [this.itemService.currentShop?.closeTime, [Validators.required]]
        });
        break;
      }
    }
  }

  ngOnDestroy(): void {
    this.itemService.currentShop = null;
  }

  public manipulate(): void {
    switch (this.instance) {
      case 'shop': {
        if (this.route.routeConfig?.path === ROUTER_NAMES.ADD) {
          this.apiService.createShop(this.shopForm.value).subscribe(() => {
            this.goBackToAll(this.shopForm, ROUTER_LINKS.SHOPS);
          });
        } else {
          this.apiService.editShop(this.itemService.currentShop.id, this.shopForm.value).subscribe(() => {
            this.goBackToAll(this.shopForm, ROUTER_LINKS.SHOPS);
          })
        }
        break;
      }
    }
  }

  public goBackToAll(form: FormGroup, target: string) {
    form.reset();
    this.router.navigate([target]);
  }

  public isFormInvalid(form: FormGroup): boolean {
    return form.invalid;
  }
}
