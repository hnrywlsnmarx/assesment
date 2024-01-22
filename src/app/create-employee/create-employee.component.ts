import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css'
})
export class CreateEmployeeComponent {
  employeeForm: FormGroup = new FormGroup({});
  myBirthday = new FormControl();
  
  myDesc = new FormControl();
  minDate = new Date(1900, 0, 1);
  tgl = new Date().getDate();
  bln = new Date().getMonth();
  thn = new Date().getFullYear();
  maxDate = new Date(this.thn, this.bln, this.tgl);

  constructor(private fb: FormBuilder, private apiService: ApiService, private snackBar: MatSnackBar) {
    

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
