import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { CompaniesService } from 'src/app/companies.service';
import { EmployeesService } from 'src/app/employees.service';
import { InterviewService } from 'src/app/interview.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-companies-detail',
  templateUrl: './companies-detail.component.html',
  styleUrls: ['./companies-detail.component.css']
})
export class CompaniesDetailComponent implements OnInit {
  id;
  job;
  Level = [];
  JobType = [];
  Avalaibility = [];
  dataCompanies;
  thisCompanies;
  edit = false;
  ownership;
    
  newInterview = {
    "idEmployee":"",
    "idJob":"",
    "date":"",
    "note":"",
    "status":"1"
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService, 
    public companiesService: CompaniesService,
    private interviewsService:InterviewService,
    public employeesService : EmployeesService
  ) {}
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
    this.job = this.companiesService.findDataJobById(this.id) ;
    this.dataCompanies = this.companiesService.dataCompanies;
    this.thisCompanies = this.companiesService.findDataCompanyByID(this.job.idCompany);
    this.Level = this.companiesService.Level;
    this.JobType = this.companiesService.JobType;
    this.Avalaibility = this.companiesService.Avalaibility;
  }

  checkOwnership(){
    if(this.userService.user.rank == 0 ){
      return true;
    }
    if(this.userService.user.rank == 1){
      let owner = this.companiesService.findDataJobByPostBy(this.userService.user.id)
      let check = owner.data.find(x => x.id == this.id)
      if (check){
        return true;
      }
    }
    return false;
  }
  async toggleEdit(){
    if(this.edit){
      await this.companiesService.updateJobFromAPI( this.id, this.job)
    }
    this.edit = !this.edit;
  }
  
  async delete(){
    await this.companiesService.deleteJobFromAPI(this.id)
    this.interviewsService.getDataFromAPI()
    this.interviewsService.refreshCustomInterview();
    this.router.navigate(['/companies']);
  }

  async addInterview(){
    let employee = this.employeesService.findDataEmployeeByPostBy(this.userService.user.id)

    this.newInterview.idEmployee = employee.id;
    this.newInterview.idJob = this.id;
    this.newInterview.date = this.newInterview.date.replace("T", " ")
    this.newInterview.note = "Apply from Employee"
    
    await this.interviewsService.postDataFromAPI(this.newInterview)
     
    this.newInterview = {
      "idEmployee":"",
      "idJob":"",
      "date":"",
      "note":"",
      "status":"1"
    }
  }
  removeItem(nameVariable, index){
    switch(nameVariable){
      case 'language':
        this.job.requireLang.splice(index,1)
        break;
      case 'job':
        this.job.jobSpec.splice(index,1)
        break;
      default:
    }
  }
  insertItem(nameVariable, newItem: string) {
    if (newItem) {
    switch(nameVariable){
      case 'language':
        this.job.requireLang.push(newItem);
        break;
      case 'job':
        this.job.jobSpec.push(newItem);
        break;
      default: 
    }
  }
  }

}
