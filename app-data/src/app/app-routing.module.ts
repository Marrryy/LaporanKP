import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompareComponent } from './compare/compare.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { InterviewComponent } from './interview/interview.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'compare', component: CompareComponent },
	{ path: 'interview', component: InterviewComponent },
	{ path: 'interview/:id', component: InterviewDetailComponent },
	{ path: 'history', component: HistoryComponent },
	
	{ path: '', redirectTo:'/dashboard', pathMatch:'full' },
	// { path: '**', redirectTo:'/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
