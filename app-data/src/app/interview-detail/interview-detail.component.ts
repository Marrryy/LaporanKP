import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/employees.service';
import { UserService } from 'src/app/user.service';
import { CompaniesService } from '../companies.service';
import { InterviewService } from '../interview.service';


@Component({
  selector: 'app-interview-detail',
  templateUrl: './interview-detail.component.html',
  styleUrls: ['./interview-detail.component.css']
})
export class InterviewDetailComponent implements OnInit {
  id;
  interview;
  Avalaibility;
  Accept;
  edit = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService, 
    public employeesService : EmployeesService,
    public companiesService: CompaniesService,
    public interviewsService: InterviewService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
    this.interview = this.interviewsService.findDataInterviewById(this.id)
    // console.log(this.interview)
    this.Avalaibility = this.interviewsService.Avalaibility
    this.Accept = this.interviewsService.Acceptance
  }

  async toggleEdit(){
    if(this.edit){
      await this.interviewsService.updateDataFromAPI( this.id, this.interview)
    }
    this.edit = !this.edit;
  }

  async acceptComp(){
    await this.interviewsService.updateDataFromAPI( this.id, {acceptCompany:1})
    this.router.navigate(['/interview']);
  }
  async acceptEmplo(){
    await this.interviewsService.updateDataFromAPI( this.id, {acceptEmployee:1})
    this.router.navigate(['/interview']);
  }
  async declineComp(){
    await this.interviewsService.updateDataFromAPI( this.id, {acceptCompany:2, status:0})
    this.router.navigate(['/interview']);
  }
  async declineEmplo(){
    await this.interviewsService.updateDataFromAPI( this.id, {acceptEmployee:2, status:0})
    this.router.navigate(['/interview']);
  }
}
