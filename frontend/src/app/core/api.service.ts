import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AboutUs } from "../shared/interfaces/about-us";
import { Employee } from "../shared/interfaces/employee";
import { Shop } from "../shared/interfaces/shop";
import { Provider } from "../shared/interfaces/provider";
import { Material } from "../shared/interfaces/material";
import { Product } from "../shared/interfaces/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  public getAboutUs(): Observable<AboutUs> {
    return this.http.get<AboutUs>(this.apiEndpoint + '/about-us');
  }

  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiEndpoint + '/employees');
  }

  public getAllShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiEndpoint + '/shops');
  }

  public createShop(shopDetails: any): Observable<Shop> {
    return this.http.post<Shop>(this.apiEndpoint + '/shops', shopDetails);
  }

  public editShop(id: string, shopDetails: any): Observable<Shop> {
    return this.http.put<Shop>(this.apiEndpoint + `/shops/${id}`, shopDetails);
  }

  public deleteShop(id: string): Observable<string> {
    return this.http.delete<string>(this.apiEndpoint + `/shops/${id}`);
  }

  public getAllProviders(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiEndpoint + '/providers');
  }

  public getAvailableMaterials(providerId: string): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiEndpoint + `/materials?provider=${providerId}`);
  }

  public getAvailableProducts(providerId: string, materialId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiEndpoint + `/products?provider=${providerId}&material=${materialId}`);
  }

}
