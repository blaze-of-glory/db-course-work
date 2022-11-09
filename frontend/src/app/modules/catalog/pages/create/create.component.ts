import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

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
}
