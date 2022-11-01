import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./components/header/header.component";
import {RouterLink, RouterLinkWithHref} from "@angular/router";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        RouterLink
    ]
})
export class SharedModule { }
