import { Injectable } from '@angular/core';
import { Pool } from "../shared/interfaces/pool";
import { Employee } from "../shared/interfaces/employee";
import { Client } from '../shared/interfaces/client';
import { Payment } from '../shared/interfaces/payment';
import { Bill } from '../shared/interfaces/bill';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

 public selectedPool: Pool | null = null;
 public selectedEmployee: Employee | null = null;
 public selectedClient: Client | null = null;
 public selectedPayment: Payment | null = null;
 public selectedBill: Bill | null = null;

  constructor() { }
}
