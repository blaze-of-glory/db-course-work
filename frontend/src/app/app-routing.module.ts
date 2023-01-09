import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_NAMES } from "./shared/constants/router-names";
import { CatalogComponent } from "./modules/catalog/pages/catalog/catalog.component";
import { ItemComponent } from "./modules/catalog/pages/item/item.component";
import { ManipulateComponent } from "./modules/catalog/pages/manipulate/manipulate.component";

const routes: Routes = [
  {
    path: ROUTER_NAMES.CLIENTS,
    component: CatalogComponent,
    pathMatch: 'full'
  },
  {
    path: ROUTER_NAMES.CLIENT,
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
    path: ROUTER_NAMES.POOLS,
    component: CatalogComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.ADD,
    component: ManipulateComponent,
    pathMatch: "full"
  },
  {
    path: ROUTER_NAMES.EDIT,
    component: ManipulateComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
