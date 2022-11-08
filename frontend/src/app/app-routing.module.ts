import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_NAMES } from "./shared/constants/router-names";
import { HomeComponent } from "./modules/home/pages/home/home.component";
import { CatalogComponent } from "./modules/catalog/pages/catalog/catalog.component";
import { ItemComponent } from "./modules/catalog/pages/item/item.component";
import { CreateComponent } from "./modules/catalog/pages/create/create.component";

const routes: Routes = [
  {
    path: ROUTER_NAMES.HOME,
    component: HomeComponent
  },
  {
    path: ROUTER_NAMES.PROVIDERS,
    component: CatalogComponent,
    pathMatch: 'full'
  },
  {
    path: ROUTER_NAMES.PRODUCTS,
    component: CatalogComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.MATERIALS,
    component: CatalogComponent,
    pathMatch: 'full'
  },
  {
    path: ROUTER_NAMES.PRODUCT,
    component: ItemComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.EMPLOYEES,
    component: CatalogComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.EMPLOYEE,
    component: ItemComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.SHOPS,
    component: CatalogComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.ADD,
    component: CreateComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
