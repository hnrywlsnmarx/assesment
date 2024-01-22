import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']

})


export class EmployeeComponent implements OnInit {

  employees: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  displayedEmployees: any[] = [];

  constructor(private http: HttpClient) { }

  searchKeyword: string = '';
  searchStatus: string = '';
  setJumlahData: number = 0;

  ngOnInit(): void {
    this.fetchEmployeeData();
  }

  fetchEmployeeData(): void {
    this.http.get<any[]>('http://localhost:3000/api/employees').subscribe(
      (data) => {
        this.employees = data;
        this.totalItems = this.employees.length;
        this.paginateData();
        this.search();
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  // onPageChange(page: number): void {
  //   this.currentPage = page;
  // }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
    this.search();
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEmployees = this.employees.slice(startIndex, endIndex);
  }

  search(): void {
    const filteredEmployees = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      employee.status.toLowerCase().includes(this.searchStatus.toLowerCase())
    );

    this.totalItems = filteredEmployees.length;
    console.log(this.totalItems);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEmployees = filteredEmployees.slice(startIndex, endIndex);

  }

  searchAndLimitData(): void {
    const filteredData = this.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(this.searchKeyword.toLowerCase()) &&
      employee.status.toLowerCase().includes(this.searchStatus.toLowerCase())
    );

    this.displayedEmployees = this.limitData(filteredData);
    
  }

  limitData(data: any[]): any[] {
    this.totalItems = this.setJumlahData;
    return data.slice(0, this.setJumlahData);
  }
}