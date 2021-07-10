import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  dummyDataCompanies = [
    {
      "id" : "1",
      "name" : "A",
      "address" : "Indo",
      "email" : "Indo",
      "telephone":"021",
    },

    {
      "id" : "2",
      "name" : "B",
      "address" : "Indo",
      "email" : "Indo",
      "telephone":"021",
    }
  ];
  dummyDataJob = [
    {
      "id" : "1",
      "idCompany" : "1",
      "name" : "Developers",
      "skillreq":"have a great talent",
      "jobSpec":["css", "javascript","html"],
      "requireLang":"english, jpn",
      "seniorityLvl":1,
      "jobDesc":"create good web",
      "intendedLoc":"Indo, Jakarta",
      "yearsExp":1,
      "jobType":2,
      "status" :1
    },

    {
      "id" : "2",
      "idCompany" : "2",
      "name" : "Uwu",
      "skillreq":"have a great talent",
      "jobSpec":["angular", "sql"],
      "requireLang":"english, idn",
      "seniorityLvl":2,
      "jobDesc":"create good web",
      "intendedLoc":"Indo, Surabaya",
      "yearsExp":1,
      "jobType":0,
      "status" :1
    },
    {
      "id" : "3",
      "idCompany" : "1",
      "name" : "Tidur",
      "skillreq":"have a great talent",
      "jobSpec":["git", "react"],
      "requireLang":"english",
      "seniorityLvl":3,
      "jobDesc":"create good web",
      "intendedLoc":"Indo, Jakarta",
      "yearsExp":1,
      "jobType":0,
      "status" :1
    },
    {
      "id" : "4",
      "idCompany" : "1",
      "name" : "Makan",
      "skillreq":"have a great talent",
      "jobSpec":["git", "sql"],
      "requireLang":"english",
      "seniorityLvl":0,
      "jobDesc":"create good web",
      "intendedLoc":"-",
      "yearsExp":1,
      "jobType":1,
      "status" :0
    },
  ];
  Level = ["Beginner", "Medium", "Advance", "Expert"];

  JobType = [ "Full Time", "Part Time", "Freelance"];

  Avalaibility = ["Not Avalaible","Avalaible"];

  dataCompanies;
  dataJob;
  customJob;
  customJobID;
  constructor(private api : APIService,
    ) { }

  findDataJobById(id){
    return this.dataJob.find(x => x.id == id)
  }
  findDataCompanyByID (id){
    return(this.dataCompanies.find(x => x.id == id));
  }

  findDataCompanyByPostBy (id){
    return(this.dataCompanies.find(x => x.postBy == id));
  }
  findDataJobByPostBy(id){
    let dataComp = this.findDataCompanyByPostBy(id)
    return {data:this.dataJob.filter(x => x.idCompany == dataComp.id), comp:dataComp}
  }
  clearCustom(){
    this.customJobID = ''
    this.customJob = ''
  }


  setCustomJob(id){
    this.customJobID = id
    this.refreshCustomJob()
  }
  refreshCustomJob(){
    if(this.customJobID){
      this.customJob = this.findDataJobByPostBy(this.customJobID).data;
    }
  }

  getComp() {
    if(this.dataCompanies == undefined){
      this.getCompByLS()
    }
    return this.dataCompanies;
  }

  setComp(newComp) {
    this.dataCompanies = newComp;
    localStorage.setItem('comp', JSON.stringify(newComp))
  }
  
  getCompByLS() {
    if(localStorage.getItem('comp')){
      this.dataCompanies =JSON.parse(localStorage.getItem('comp'));
    }else{
      this.getCompFromAPI(); 
    }
  }

  async getCompFromAPI(){
    await this.api.get('company')
    .subscribe((data) => {
      this.setComp(data)    
      location.reload;
      }
    );
  }

  async postCompFromAPI(newData){
    await this.api.post('company', newData)
      .subscribe((data) => {
        console.log("Success")
        this.getCompFromAPI()
      }
      );
  }

  async updateCompFromAPI(id, newData){
    await this.api.put('company', id, newData)
      .subscribe((data) => {
        console.log("Success")
        this.getCompFromAPI()
      }
      );
  }
  
  getJob() {
    if(this.dataJob == undefined){
      this.getJobByLS()
    }
    return this.dataJob;
  }

  setJob(newJob) {
    this.dataJob = newJob;
    this.refreshCustomJob()
    localStorage.setItem('job', JSON.stringify(newJob))
  }

  
  getJobByLS() {
    if(localStorage.getItem('job')){
      this.dataJob =JSON.parse(localStorage.getItem('job'));
      this.refreshCustomJob()
    }else{
      this.getJobFromAPI(); 
    }
  }

  async getJobFromAPI(){
    await this.api.get('job')
    .subscribe((data) => {
      this.setJob(data)    
      location.reload;
      }
    );
  }

  async postJobFromAPI(newData){
    await this.api.post('job', newData)
      .subscribe((data) => {
        console.log("Success")
        this.getJobFromAPI()
      }
      );
  }
  
  async updateJobFromAPI(id, newData){
    await this.api.put('job', id, newData)
      .subscribe((data) => {
        console.log("Success")
        this.getJobFromAPI()
      }
      );
  }

  async deleteJobFromAPI(id){
    await this.api.delete('job', id)
      .subscribe((data) => {
        console.log("Success")
        this.getJobFromAPI()
      }
      );
  }

}
