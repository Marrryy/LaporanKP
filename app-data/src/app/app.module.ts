import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrLoginComponent } from './err-login/err-login.component';
import { CompareComponent } from './compare/compare.component';
import { AppMaterialModule } from './app-material';
import { CompanyModule } from './companies/company.module';
import { EmployeesModule } from './employees/employees.module';
import { InterviewComponent } from './interview/interview.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxImageCompressService} from 'ngx-image-compress';
import { UserModule } from './user/user.module';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ErrLoginComponent,
    CompareComponent,
    InterviewComponent,
    InterviewDetailComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    CompanyModule,
    EmployeesModule,
    UserModule
  ],
  // providers: [],
  providers: [NgxImageCompressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
