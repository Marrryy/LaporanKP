import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompaniesComponent } from './companies/companies.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';


@NgModule({
  declarations: [
    CompaniesComponent,
    CompaniesDetailComponent,
    CompanyEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
