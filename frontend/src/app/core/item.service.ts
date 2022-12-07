import { Injectable } from '@angular/core';
import { Shop } from "../shared/interfaces/shop";
import { Employee } from "../shared/interfaces/employee";
import { Provider } from '../shared/interfaces/provider';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

 public selectedShop: Shop | null = null;
 public selectedEmployee: Employee | null = null;
 public selectedProvider: Provider | null = null;

  constructor() { }
}
