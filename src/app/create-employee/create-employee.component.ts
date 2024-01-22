import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup = new FormGroup({});
  myBirthday = new FormControl();
  employees: any[] = [];
  totalItems: number = 0;
  myDesc = new FormControl();
  minDate = new Date(1900, 0, 1);
  tgl = new Date().getDate();
  bln = new Date().getMonth();
  thn = new Date().getFullYear();
  maxDate = new Date(this.thn, this.bln, this.tgl);

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient) {
    

    // console.log(this.myBirthday.value);

  }

  ngOnInit(): void {
    
    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: ['1977-01-12', Validators.required],
      basicSalary: ['', Validators.required],
      status:['', Validators.required],
      group: ['PT AOT', Validators.required],
      description: ['', Validators.required]


    });
  }

  onSubmit(): void {
    this.http.get<any[]>('http://localhost:3000/api/employees').subscribe(
      (data) => {
        this.employees = data;
        this.totalItems = this.employees.length;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
    const newEmployeeData = this.employeeForm.value;
    console.log(newEmployeeData);
    console.log('New Employee Data:', newEmployeeData);
    this.apiService.addEmployee(newEmployeeData).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.showSnackBar('sukses menyimpan');
        
      },
      (error) => {
        console.error('Error adding employee:', error);
        this.showSnackBar('gagal menyimpan');
      }
    );
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'custom-snackbar' 
      
    });
  }
}
