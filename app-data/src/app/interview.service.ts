import { Injectable } from '@angular/core';
import { APIService } from './api.service';
// import { CompaniesService } from './companies.service';
// import { EmployeesService } from './employees.service';
// import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  dummyDataInterview =  [{
    "id":"1",
    "idJob":"1",
    "idEmployee":"1",
    "date" : "2021-05-23 18:00",
    "note" : "",
    "status": 1
  },{
    "id":"2",
    "idJob":"3",
    "idEmployee":"2",
    "date" : "2021-04-12 11:00",
    "note" : "Employee not attend",
    "status": 0
  }];

  dataInterview;
  dataInterviewActive;
  customInterID;
  customInterRank;
  customInter;
  customOtherData;
  Avalaibility = ["Cancelled","Pending","Avalaible", "Finished"];
  Acceptance = ["None","Accepted", "Decline"]
  AcceptanceSimple = ["","V", "X"]
  constructor(private api : APIService, 
    // private e: EmployeesService, private c:CompaniesService
    ) { }
  findDataInterviewById(id){
    return this.dataInterview.find(x => x.id == id)
  }

  findDataInterviewByOtherData(){
    if(this.customInterRank == 1){
      // console.log(this.dataInterview)
      return this.dataInterview.filter(({ idJob: id1 }) => this.customOtherData.some(({ id: id2 }) => id2 === id1));
    } else if(this.customInterRank == 2){
      return this.dataInterview.filter(x => x.idEmployee == this.customOtherData)
    }
  }

  findActiveData(code){
    switch (code) {
      case 0 :  this.dataInterviewActive = this.dataInterview.filter(x => x.status != 0 && x.status != 3); break
      case 1 :  this.dataInterviewActive = this.customInter.filter(x => x.status != 0 && x.status != 3)
    }

  }
  clearCustom(){
    this.customInterRank = ''
    this.customOtherData = ''
    this.customInter = ''
  }
  setCustomInterview(code, data){
    // this.customInterID = id
    this.customInterRank = code
    this.customOtherData = data
    this.refreshCustomInterview()
  }
  refreshCustomInterview(){
    if(this.customOtherData){
      this.customInter = this.findDataInterviewByOtherData();
      this.findActiveData(1)
    }else{
      this.findActiveData(0)
    }
  }



  getInter(){
    // getInter(): Observable<any[]>{
    if(this.dataInterview == undefined){
      this.getInterByLS()
    }
    return this.dataInterview;
  }

  setInter(newInter) {
    this.dataInterview = newInter;
    this.refreshCustomInterview();
    localStorage.setItem('inter', JSON.stringify(newInter))
  }
  
  getInterByLS() {
    if(localStorage.getItem('inter')){
      this.dataInterview =JSON.parse(localStorage.getItem('inter'));
      this.refreshCustomInterview();
    }else{
      this.getDataFromAPI(); 
    }
  }


  async getDataFromAPI(){
    await this.api.get('interview')
    .subscribe((data) => {
      // console.log("GET DATA")
      // console.log(data)
      this.setInter(data)    
      location.reload;
      }
    );
  }

  async postDataFromAPI(newData){
    await this.api.post('interview', newData)
      .subscribe((data) => {
        console.log(data)
        this.getDataFromAPI()
      }
      );
  }

  async updateDataFromAPI(id, newData){
    await this.api.put('interview', id, newData)
      .subscribe((data) => {
        console.log("Success")
        this.getDataFromAPI()
      }
      );
  }

  async deleteDataFromAPI(id){
    await this.api.delete('interview', id)
      .subscribe((data) => {
        console.log("Success")
        this.getDataFromAPI()
      }
      );
  }
}
