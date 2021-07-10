import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
