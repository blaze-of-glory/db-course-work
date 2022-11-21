import { Injectable } from '@angular/core';
import { Shop } from "../shared/interfaces/shop";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

 public currentShop: Shop | null = null;

  constructor() { }
}
