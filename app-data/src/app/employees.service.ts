import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import {InMemoryDbService} from 'angular-in-memory-web-api'
import { ContentObserver } from '@angular/cdk/observers';
import { InterviewService } from './interview.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService{

  dummyDataEmployee = [{
    "id":"1",
    "name":"pak",
    "profileDesc":"hai",
    "email" : "A@amail.cm",
    "telp" : "021-2323232",
    "yearsExp" : 3,
    "skill": [{"name":"angular", "lvl":2}, {"name":"sql", "lvl":1}], 
    "lastEducation": "UI-2020",
    "language" : "Idn",
    "location": "Jakarta",
    "status": 1
  },{
    "id":"2",
    "name":"paki",
    "profileDesc":"hai",
    "email" : "A@amail.cm",
    "telp" : "021-2323232",
    "yearsExp" : 3,
    "skill": [{"name":"angular", "lvl":3}, {"name":"git", "lvl":0}], 
    "lastEducation": "UI-2020",
    "language" : "Idn",
    "location": "Jakarta",
    "status": 0
  }];

  dataEmployee;
  Level = ["Beginner", "Medium", "Advance", "Expert"];

  Avalaibility = ["Not Avalaible","Avalaible"];

  constructor(private api : APIService,
    private interviewsService: InterviewService) { }

  findDataEmployeeById(id){
    return this.dataEmployee.find(x => x.id == id)
  }
  findDataEmployeeByPostBy(id){
    return this.dataEmployee.find(x => x.postBy == id)
  }
  getEmplo() {
    if(this.dataEmployee == undefined){
      this.getEmploByLS()
    }
    return this.dataEmployee;
  }

  setEmplo(newEmplo) {
    // console.log("SET DATA")
    // console.log(newEmplo)
    this.dataEmployee = newEmplo;
    localStorage.setItem('emplo', JSON.stringify(newEmplo))
    // console.log(JSON.parse(localStorage.getItem('emplo')))
  }

  
  getEmploByLS() {
    if(localStorage.getItem('emplo')){
      this.dataEmployee =JSON.parse(localStorage.getItem('emplo'));
    }else{
      this.getDataFromAPI(); 
    }
  }


  async getDataFromAPI(){
    await this.api.get('employee')
    .subscribe((data) => {
      // console.log("GET DATA")
      // console.log(data)
      this.setEmplo(data)    
      location.reload;
      }
    );
  }

  async postDataFromAPI(newData){
    await this.api.post('employee', newData)
      .subscribe((data) => {
        console.log("Success")
        this.getDataFromAPI()
      }
      );
  }


  async updateDataFromAPI(id, newData){
    await this.api.put('employee', id, newData)
      .subscribe((data) => {
        console.log(data)
        this.getDataFromAPI()
      }
      );
  }

  async deleteDataFromAPI(id){
    await this.api.delete('employee', id)
      .subscribe((data) => {
        console.log("Success")
        this.getDataFromAPI()
        this.interviewsService.getDataFromAPI()
      }
      );
  }
  
}
 