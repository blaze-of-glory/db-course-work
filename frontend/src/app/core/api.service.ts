import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Employee } from "../shared/interfaces/employee";
import { Pool } from "../shared/interfaces/pool";
import { Client } from "../shared/interfaces/client";
import { Product } from "../shared/interfaces/product";
import { Bill } from '../shared/interfaces/bill';
import { Payment } from '../shared/interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiEndpoint + '/employees');
  }

  public getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.apiEndpoint + `/employees/${id}`);
  }

  public createEmployee(employeeDetails: any): Observable<Employee> {
    return this.http.post<Employee>(this.apiEndpoint + '/employees', employeeDetails);
  }

  public editEmployee(id: string,employeeDetails: any): Observable<Employee> {
    return this.http.put<Employee>(this.apiEndpoint + `/employees/${id}`, employeeDetails);
  }

  public deleteEmployee(id: string): Observable<string> {
    return this.http.delete<string>(this.apiEndpoint + `/employees/${id}`);
  }

  public getAllPools(): Observable<Pool[]> {
    return this.http.get<Pool[]>(this.apiEndpoint + '/pools');
  }

  public createPool(poolDetails: any): Observable<Pool> {
    return this.http.post<Pool>(this.apiEndpoint + '/pools', poolDetails);
  }

  public editPool(id: string, poolDetails: any): Observable<Pool> {
    return this.http.put<Pool>(this.apiEndpoint + `/pools/${id}`, poolDetails);
  }

  public deletePool(id: string): Observable<string> {
    return this.http.delete<string>(this.apiEndpoint + `/pools/${id}`);
  }

  public getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiEndpoint + '/clients');
  }

  public getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(this.apiEndpoint + `/clients/${id}`);
  }

  public createClient(productDetails: any): Observable<Client> {
    return this.http.post<Client>(this.apiEndpoint + '/clients', productDetails);
  }

  public editClient(id: string, productDetails: any): Observable<Product> {
    return this.http.put<Product>(this.apiEndpoint + `/clients/${id}`, productDetails);
  }

  public createPayment(id: string, paymentDetails: any): Observable<Payment> {
    return this.http.post<Payment>(this.apiEndpoint + `/payments/${id}`, paymentDetails);
  }

  public editPayment(id: string, paymentDetails: any): Observable<Payment> {
    return this.http.put<Payment>(this.apiEndpoint + `/payments/${id}`, paymentDetails);
  }

  public deletePayment (id: string): Observable<string> {
    return this.http.delete<string>(this.apiEndpoint + `/payments/${id}`);
  }

  public createBill(id: string, billDetails: any): Observable<Bill> {
    return this.http.post<Bill>(this.apiEndpoint + `/bills/${id}`, billDetails)
  }

  public editBill(id: string, billDetails: any): Observable<Bill> {
    return this.http.put<Bill>(this.apiEndpoint + `/bills/${id}`, billDetails);
  }

  public deleteBill(id: string): Observable<string> {
    return this.http.delete<string>(this.apiEndpoint + `/bills/${id}`);
  }
}
