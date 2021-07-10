import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesDetailComponent } from './companies-detail/companies-detail.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyEditComponent } from './company-edit/company-edit.component';

const routes: Routes = [
  { path: 'companies', component: CompaniesComponent },
  { path: 'job/:id', component: CompaniesDetailComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
