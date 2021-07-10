import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../companies.service';
import { EmployeesService } from '../employees.service';
import { UserService } from '../user.service';

import {
  debounceTime, distinctUntilChanged
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { InterviewService } from '../interview.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  dataEmployee;
  dataCompanies;
  dataJob;

  filtEmplo;
  filtJob;

  termTitle = ["Skill", "Language", "Location"];
  statusBox = false;
  term;
  termT="Skill";
  skillHeight=0;

  curEmplo;
  curJob;
  curComp;
  curEmploSelect="-";
  curJobSelect="-";

  Avalaibility;
  Level;
  
  newInterview = {
    "idEmployee":"",
    "idJob":"",
    "date":"",
    "note":"",
    "status":"1"
  }

  // today = new Date().toISOString();
  today = new Date().toISOString();


  constructor(
    public userService: UserService, 
    public employeesService : EmployeesService,
    public companiesService: CompaniesService,
    public interviewsService: InterviewService
    ) { }

  ngOnInit(): void {
    this.dataEmployee = this.employeesService.dataEmployee
    this.dataCompanies = this.companiesService.dataCompanies;
    this.dataJob = this.companiesService.dataJob;

    this.Level = this.employeesService.Level
    this.Avalaibility = this.employeesService.Avalaibility
  
    this.filtEmplo =this.dataEmployee;
    this.filtJob =this.dataJob;
    
  }

  moneyDots(money){
    // Convert to String and add dots every 3 digits
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
  }

  setCurrentJob(id){
    this.curJob = id == "-" ? "" : this.dataJob.find(x => x.id == id)

    this.curComp = this.companiesService.findDataCompanyByID(this.curJob.idCompany)

    this.skillHeight = this.skillHeight < this.curJob.jobSpec.length? this.curJob.jobSpec.length: this.skillHeight 
  }
  setCurrentEmployee(id){
    this.curEmplo = id == "-" ? "" :this.dataEmployee.find(x => x.id == id)

    this.skillHeight = this.skillHeight < this.curEmplo.skill.length? this.curEmplo.skill.length: this.skillHeight 
  }
  resetAll(){
    this.term = ""
    this.filtEmplo =this.dataEmployee;
    this.filtJob =this.dataJob;
    this.reset()
  }
  reset(){
    this.curJob = ""
    this.curEmplo = ""
    this.curEmploSelect="-";
    this.curJobSelect="-";
    this.skillHeight=0;
  }

  findMatch(){    
    switch (this.termT){
      case this.termTitle[0]:
        this.filtJob = this.dataJob.filter((x)=> x.jobSpec.find((y)=> y.toLowerCase().includes(this.term.toLowerCase())))
        this.filtEmplo = this.dataEmployee.filter((x)=> x.skill.find((y)=>y.name.toLowerCase().includes(this.term.toLowerCase())))
        break;
      
      case this.termTitle[1]:
        this.filtJob = this.dataJob.filter((x)=> x.requireLang ? x.requireLang.toLowerCase().includes(this.term): false)
        this.filtEmplo = this.dataEmployee.filter((x)=> x.language ? x.language.toLowerCase().includes(this.term): false)
        break;

      case this.termTitle[2]:
        this.filtJob = this.dataJob.filter((x)=> x.intendedLoc ? x.intendedLoc.toLowerCase().includes(this.term) ||  x.intendedLoc.toLowerCase()== "-": false)
        this.filtEmplo = this.dataEmployee.filter((x)=> x.location ? x.location.toLowerCase().includes(this.term) ||  x.location.toLowerCase()== "-" : false)
        break;

      default:
        this.filtEmplo =this.dataEmployee;
        this.filtJob =this.dataJob;
        }
      if(!this.term){
        this.filtEmplo =this.dataEmployee;
        this.filtJob =this.dataJob;
      }
    this.reset()
    this.filtAva()
  }

  changeSearchTitle(title){
    this.termT=title;
    this.findMatch()
  }

  async save(){
    this.newInterview.idEmployee = this.curEmplo.id;
    this.newInterview.idJob = this.curJob.id;
    this.newInterview.date = this.newInterview.date.replace("T", " ")
    
    await this.interviewsService.postDataFromAPI(this.newInterview)
     
    this.newInterview = {
      "idEmployee":"",
      "idJob":"",
      "date":"",
      "note":"",
      "status":"1"
    }
  }

  filtAva(){
   if(this.statusBox){
    this.filtEmplo =this.filtEmplo.filter((x)=> x.status == 1);
    this.filtJob =this.filtJob.filter((x)=> x.status == 1);
   }
  }
}
