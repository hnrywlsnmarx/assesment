import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';
  cache: any;
  

  constructor(private http: HttpClient) {}

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employeeData);

  }

  searchEmployees(keyword: string, status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/search?keyword=${keyword}&status=${status}`);
  }

  limitEmployees(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/limit=${limit}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`);
  }

}
