import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { RouterLink, RouterLinkWithHref } from "@angular/router";
import { ItemComponent } from "./pages/item/item.component";
import { ManipulateComponent } from './pages/manipulate/manipulate.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CatalogComponent,
    ItemComponent,
    ManipulateComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        RouterLink,
        ReactiveFormsModule
    ]
})
export class CatalogModule { }
