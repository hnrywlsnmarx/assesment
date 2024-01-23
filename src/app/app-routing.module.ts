import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { EmployeeComponent } from './employee/employee.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'employee', component: EmployeeComponent },
  { path: 'create', component: CreateEmployeeComponent },
  { path: 'show/:id', component: ShowEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
