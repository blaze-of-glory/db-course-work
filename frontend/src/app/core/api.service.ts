import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AboutUs } from "../shared/interfaces/about-us";
import { Employee } from "../shared/interfaces/employee";

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

}
