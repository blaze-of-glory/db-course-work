import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import {RouterLinkWithHref} from "@angular/router";
import {ItemComponent} from "./pages/item/item.component";



@NgModule({
  declarations: [
    CatalogComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref
  ]
})
export class CatalogModule { }
