import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material';


@NgModule({
  declarations: [
    EmployeeDetailComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
