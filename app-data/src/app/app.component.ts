import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from './companies.service';
import { EmployeesService } from './employees.service';
import { InterviewService } from './interview.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-data';
  constructor(
    public router: Router, 
    public userService: UserService,
    private employeesService : EmployeesService,
    private companiesService: CompaniesService,
    private interviewService: InterviewService,
    ) { 
  }

  ngOnInit(): void {
    this.userService.getUser();
    this.userService.getUsers();
    this.employeesService.getEmplo();
    this.companiesService.getComp();
    this.companiesService.getJob();
    this.interviewService.getInter();
  }
  

  logout(){
    this.userService.clearUser();
    this.companiesService.clearCustom();
    this.interviewService.clearCustom();
    this.router.navigate(['/dashboard']);
  }

  refresh(){
    location.reload()
  }

}
