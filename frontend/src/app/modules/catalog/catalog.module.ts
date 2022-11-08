import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { RouterLink, RouterLinkWithHref } from "@angular/router";
import { ItemComponent } from "./pages/item/item.component";
import { CreateComponent } from './pages/create/create.component';



@NgModule({
  declarations: [
    CatalogComponent,
    ItemComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        RouterLink
    ]
})
export class CatalogModule { }
