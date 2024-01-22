import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup = new FormGroup({});
  // myBirthday = new FormControl();
  employees: any[] = [];
  totalItems: number = 0;
  // myDesc = new FormControl();
  minDate = new Date(1900, 0, 1);
  tgl = new Date().getDate();
  bln = new Date().getMonth();
  thn = new Date().getFullYear();
  maxDate = new Date(this.thn, this.bln, this.tgl);

  selectedGroup: string = '';
  selectedBirthDate: string = '';
  selectedStatus: string = '';

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {


    // console.log(this.myBirthday.value);

  }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: [this.selectedBirthDate, Validators.required],
      basicSalary: ['', Validators.required],
      marital_status: [this.selectedStatus, Validators.required],
      emp_group: [this.selectedGroup, Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {

    const newEmployeeData = this.employeeForm.value;
    console.log(newEmployeeData);
    console.log('New Employee Data:', newEmployeeData);
    this.apiService.addEmployee(newEmployeeData).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.showSnackBar('sukses menyimpan');
        // this.router.navigate(['/employee']);

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
