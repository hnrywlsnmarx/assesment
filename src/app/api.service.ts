import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000';
  cache: any;


  constructor(private http: HttpClient) { }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/employees`, employeeData);

  }

  getEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/`);
  }

  fetchEmployees(keyword: string, status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/search?keyword=${keyword}&status=${status}`);
  }

  searchEmployees(keyword: string, status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/search?keyword=${keyword}&status=${status}`);
  }


  
  searchEmployeesSalary(keyword: string, salary1: number, salary2: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/searchsalary?keyword=${keyword}&basicSalary=${salary1}&basicSalary=${salary2}`);
  }

  limitEmployees(limit: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/limit=${limit}`);
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`);
  }

  remEmployeeById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employees/${id}`);
  }

}
