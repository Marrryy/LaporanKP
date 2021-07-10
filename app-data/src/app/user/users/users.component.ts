import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/companies.service';
import { EmployeesService } from 'src/app/employees.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  newUser = {
    "name":"",
    "email":"",
    "rank":"",
    "password":""
  }
  Rank = [];
  constructor(public userService: UserService,
    private employeesService : EmployeesService,
    private companiesService: CompaniesService,
    ) { }

  ngOnInit(): void {
    this.Rank = this.userService.Rank;
  }
  async saveUser(){
    this.newUser.password = this.newUser.email 
    if(this.newUser.name.length>1 && this.newUser.email.length>1 && this.newUser.rank){
      await this.userService.postDataFromAPI(this.newUser)
      this.newUser = {
        "name":"",
        "email":"",
        "rank":"",
        "password":""
      }
      await this.companiesService.getCompFromAPI()
      await this.employeesService.getDataFromAPI()

    }else{
      alert("Data not Completed")
    }
  }
}


