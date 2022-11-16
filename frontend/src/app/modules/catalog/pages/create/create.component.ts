import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from "../../../../core/api.service";
import { ROUTER_LINKS } from '../../../../shared/constants/router-links';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{
  title!: string;
  instance!: 'employee' | 'shop' | 'product';
  employeeForm!: FormGroup;
  shopForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
    ) { }

  ngOnInit() {
    switch (this.route.snapshot.params['instance']) {
      case 'employee' : {
        this.title = 'Добавить нового сотрудника';
        this.instance = 'employee';
        this.employeeForm = this.fb.group({
          img: ['', [Validators.required]],
          name: ['', [Validators.required]],
          surname: ['', [Validators.required]],
          age: [''],
          position: [''],
          salary: ['']
        });
        break;
      }
      case 'shop' : {
        this.title = 'Добавить новый магазин';
        this.instance = 'shop';
        this.shopForm = this.fb.group({
          img: ['', [Validators.required]],
          address: ['', [Validators.required]],
          openTime: ['', [Validators.required]],
          closeTime: ['', [Validators.required]]
        });
        break;
      }
    }
  }

  public create(): void {
    switch (this.instance) {
      case 'shop': {
        this.apiService.createShop(this.shopForm.value).subscribe(() => {
          this.shopForm.reset();
          this.router.navigate([ROUTER_LINKS.SHOPS]);
        });
        break;
      }
    }
  }

  back() {
    switch (this.instance) {
      case 'shop': {
        this.shopForm.reset();
        this.router.navigate([ROUTER_LINKS.SHOPS]);
        break;
      }
      case "employee": {
        this.employeeForm.reset();
        this.router.navigate([ROUTER_LINKS.EMPLOYEES]);
        break;
      }
    }
  }

  isFormInvalid(): boolean {
    switch (this.instance) {
      case 'shop': {
        return this.shopForm.invalid;
      }
      case "employee": {
        return  this.employeeForm.invalid;
      }
      default: return true;
    }
  }
}
