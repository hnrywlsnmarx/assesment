import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',

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
  selectedDescription: string = '';
  selectedStatus: string = '';

  formattedBirthDate: string = '';
  formattedDescription: string = '';

  empGroupCtrl = new FormControl('');
  options: string[] = ['PT Gomu Gomu', 'NIKA', 'Onigashima', 'Enies Lobby', 'Skypeia', 'Water Seven', 'Wall of Maria', 'Genkidama', 'Diable Jimble', 'Santoryuu'];
  filteredOptions?: Observable<string[]>;

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private apiService: ApiService, private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {


    // console.log(this.myBirthday.value);

  }

  ngOnInit(): void {

    this.formattedBirthDate = this.formatDate(this.selectedBirthDate);
    this.formattedDescription = this.formatDate(this.selectedDescription);

    this.filteredOptions = this.empGroupCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),

    );

    // console.log(this.formattedBirthDate);
    // debugger;

    this.employeeForm = this.fb.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthDate: [this.formattedBirthDate, Validators.required],
      basicSalary: ['', Validators.required],
      marital_status: [this.selectedStatus, Validators.required],
      emp_group: ['', Validators.required],
      description: [this.formattedDescription, Validators.required]
    });

    this.filteredOptions.subscribe(options => {
      const empGroupControl = this.employeeForm.get('emp_group');

      if (empGroupControl) {
        const currentValue = empGroupControl.value;

        if (options.includes(currentValue)) {
        } else {
          empGroupControl.setValue(options.length > 0 ? options[0] : '');
        }
      }
    });
  }

  private formatDate(date: string): string {
    const tanggalObjek = new Date(date);
    const tanggalFormatted = `${tanggalObjek.getDate()}/${tanggalObjek.getMonth() + 1}/${tanggalObjek.getFullYear()}`;
    return tanggalFormatted;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(): void {

    const newEmployeeData = this.employeeForm.value;
    console.log(newEmployeeData.emp_group);
    // debugger;
    console.log('New Employee Data:', newEmployeeData);

    this.apiService.addEmployee(newEmployeeData).subscribe(
      (response) => {
        console.log('Employee added successfully:', response);
        this.showSnackBarSukses('sukses menyimpan');
        this.router.navigate(['/employee']);

      },
      (error) => {
        console.error('Error adding employee:', error);
        this.showSnackBarDelete('gagal menyimpan');
      }
    );
  }

  private showSnackBarDelete(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-delete']

    });
  }

  private showSnackBarSukses(message: string): void {
    this.snackBar.open(message, 'Tutup', {
      // duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-sukses']

    });
  }
}
