import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';
  cache: any;
  

  constructor(private http: HttpClient) {}

  addEmployee(employeeData: any): Observable<any> {
    const url = `${this.apiUrl}/create_employees`;
    return this.http.post(url, employeeData);

    // console.log(url);
  }

  stringifyWithoutCircular(obj: any): string {
    const cache: any[] = [];
    try {
      const jsonString = JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (this.cache.indexOf(value) !== -1) {
            
            return;
          }
          
          this.cache.push(value);
        }
        return value;
      });
      return jsonString;
    } catch (error) {
      console.error('Error converting to JSON:', error);
      return '';
    }
  }
}
