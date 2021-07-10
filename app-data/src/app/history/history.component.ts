import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { EmployeesService } from '../employees.service';
import { InterviewService } from '../interview.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  // dataInterview;
  Avalaibility;
  Accept;

  constructor(    
    public userService: UserService, 
    public employeesService : EmployeesService,
    public companiesService: CompaniesService,
    public interviewsService: InterviewService,
    ) { }

  ngOnInit(): void {
    if(this.userService.user && this.userService.user.rank != 0){
      let id = this.userService.user.id 
      if(this.userService.user.rank == 1 ){
        let idJob = this.companiesService.findDataJobByPostBy(id).data
        this.interviewsService.setCustomInterview(1, idJob)
     } else if(this.userService.user.rank == 2){
        let idEmplo = this.employeesService.findDataEmployeeByPostBy(id).id 
        this.interviewsService.setCustomInterview(2, idEmplo)
      }
    }
    // this.dataInterview = this.interviewsService.dataInterview
    this.Avalaibility = this.interviewsService.Avalaibility
    this.Accept = this.interviewsService.AcceptanceSimple
  } 
}
