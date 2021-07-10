import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService } from '../companies.service';
import { EmployeesService } from '../employees.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'app-data';
  Rank;
  recommendations = [];
  newUser = {
    "name":"",
    "email":"",
    "rank":2,
    "password":""
  }
  constructor(public userService: UserService,
    public companiesService: CompaniesService,
    public employeesService : EmployeesService,
    public router: Router) { }

  ngOnInit(): void {
    this.Rank = this.userService.Rank;
    if(this.userService.user && this.userService.user.rank == 2){
      this.getRecommendation()
    }

  }
  async saveUser(){

    if(this.newUser.name.length>1 && this.newUser.email.length>1 && this.newUser.password.length>1){
      await this.userService.postDataFromAPI(this.newUser)
      this.newUser = {
        "name":"",
        "email":"",
        "rank":2,
        "password":""
      }
      alert("Register success")
      await this.companiesService.getCompFromAPI()
      await this.employeesService.getDataFromAPI()

      this.router.navigate(['/login']);
    }else{
      alert("Data not Completed")
    }
  }

  getRecommendation(){
    let employee = this.employeesService.findDataEmployeeByPostBy(this.userService.user.id);
    for(let term of employee.skill){
      if(this.recommendations.length < 3){
        let find = this.companiesService.dataJob.filter((x)=> x.jobSpec.find((y)=> y.toLowerCase().includes(term.name.toLowerCase())))
        this.recommendations = this.recommendations.concat(find)
        this.recommendations = this.recommendations.filter(function(item, pos, self) {
          return self.indexOf(item) == pos;
        })
    
      }else{
        this.recommendations = this.recommendations.slice(0, 3);
        break;
      }
    }
  }
}
