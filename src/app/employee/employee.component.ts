import { AfterViewInit, Component, NgModule, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../search.service';
import { DatePipe } from '@angular/common';


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
  totalPages: number = 0;
  displayedEmployees: any[] = [];
  searchKeyword: string = '';
  searchStatus: string = '';
  setJumlahData: number = 0;
  formattedBirthDate: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private apiService: ApiService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar, private searchService: SearchService) { }

  ngOnInit(): void {
    console.log(this.authService.isLoggedInUser());
    this.fetchEmployeeData();
  }

  fetchEmployeeData(): void {
    this.apiService.fetchEmployees(this.searchKeyword, this.searchStatus).subscribe(
      (data) => {
        this.employees = data;
        this.totalItems = this.employees.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.paginateData();

      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );

  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
    this.search();
  }

  konversiFormatTanggal(tanggal: string): string {
    const tanggalObjek = new Date(tanggal);
    const tanggalFormatted = `${tanggalObjek.getDate()}/${tanggalObjek.getMonth() + 1}/${tanggalObjek.getFullYear()}`;
    return tanggalFormatted;
  }

  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedEmployees = this.employees.slice(startIndex, endIndex);

  }

  search(): void {
    this.apiService.searchEmployees(this.searchKeyword, this.searchStatus).subscribe(
      (filteredEmployees) => {
        this.totalItems = filteredEmployees.length;
        console.log(this.totalItems);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
        this.searchService.searchResults = filteredEmployees;
      },
      (error) => {
        console.error('Error searching employees:', error);
      }
    );
  }

  searchAndLimitData(): void {
    this.apiService.searchEmployees(this.searchKeyword, this.searchStatus).subscribe(
      (filteredEmployees) => {
        this.totalItems = filteredEmployees.length;
        console.log(this.totalItems);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.displayedEmployees = filteredEmployees.slice(startIndex, endIndex);
        this.displayedEmployees = this.limitData(filteredEmployees);
      },
      (error) => {
        console.error('Error searching employees:', error);
      }
    );
  }

  limitData(data: any[]): any[] {
    this.totalItems = this.setJumlahData;
    return data.slice(0, this.setJumlahData);
  }

  loadEmployeeDetails(employeeID: number): void {
    console.log(employeeID);
    this.apiService.getEmployeeById(employeeID).subscribe(
      (result) => {
        this.showSnackBar('Edit employee ID No ' + employeeID);
        console.log(result);
      },
      (error) => {
        console.error('Error loading employee details:', error);
      }
    );
  }

  delEmployee(employeeID: number): void {
    console.log(employeeID);
    this.apiService.getEmployeeById(employeeID).subscribe(
      (result) => {
        this.showSnackBarDel('Delete employee ID No ' + employeeID);
        console.log(result);
      },
      (error) => {
        console.error('Error loading employee details:', error);
      }
    );
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-edit']
    });
  }

  private showSnackBarDel(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-delete']
    });
  }
}