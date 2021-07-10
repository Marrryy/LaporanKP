import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { CompaniesService } from 'src/app/companies.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  newCompany = {
    "name":"",
    "postBy": this.userService.user.id,
    "photo":"",
    "address":"",
    "email":"",
    "telephone":""
  }
  newJob = {
    "name":"",
    "idCompany":"",
    "skillreq": "",
    "jobSpec":[],
    "requireLang":"",
    "seniorityLvl": 0,
    "jobDesc":"",
    "intendedLoc":"",
    "salaryRange":"",
    "yearsExp":0,
    "jobType":0,
    "status":0
};
  Level = [];
  JobType = [];
  Avalaibility = [];

  // Language = [];


  // dataCompanies;
  thisCompany;
  dataJob;
  constructor(public userService: UserService, public companiesService: CompaniesService, public router: Router) { }
  
  ngOnInit(): void {
    if(this.userService.user.rank == 1){
      this.thisCompany = this.companiesService.findDataJobByPostBy(this.userService.user.id).comp;

      this.companiesService.setCustomJob(this.userService.user.id)
    }
    this.Level = this.companiesService.Level;
    this.JobType = this.companiesService.JobType;
    this.Avalaibility = this.companiesService.Avalaibility;

  }
  
  addItem(nameVariable){
    switch(nameVariable){
      case 'job':
        this.newJob.jobSpec.push("");
        break;
      default:
    }

  }
  removeItem(nameVariable, index){
    switch(nameVariable){
      case 'job':
        this.newJob.jobSpec.splice(index,1)
        break;
      default:
    }
  }
  changeItem(event: any,nameVariable, index){
    switch(nameVariable){
      case 'job':
        this.newJob.jobSpec[index]=event.target.value;
        break;
      default: 
    }
  }
  async saveComp(){
    await this.companiesService.postCompFromAPI(this.newCompany)
    // location.reload()
    this.newCompany = {
      "name":"",
      "postBy": this.userService.user.id,
      "photo":"",
      "address":"",
      "email":"",
      "telephone":""
    }
  }
  async saveJob(){
    // console.log(this.newJob)
    await this.companiesService.postJobFromAPI(this.newJob)
    
    this.newJob = {
      "name":"",
      "idCompany":"",
      "skillreq": "",
      "jobSpec":[],
      "requireLang":"",
      "seniorityLvl": 0,
      "jobDesc":"",
      "intendedLoc":"",
      "salaryRange":"",
      "yearsExp":0,
      "jobType":0,
      "status":0
    };
  }
  insertItem(nameVariable, newItem: string) {
    if (newItem) {
    switch(nameVariable){
      // case 'language':
      //   this.Language.push(newItem);
      //   break;
      case 'job':
        this.newJob.jobSpec.push(newItem);
        break;
      default: 
    }
  }
  }

  async fileChange(event: Event){
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const b= files[0];

    if(b.size > 1048576){
        alert("File is too big!");
        target.value = "";
     }else{
      let res= await new Promise(function(resolve) {
            var reader = new FileReader();
            reader.onloadend = function() {
                resolve(reader.result)
            }
            reader.readAsDataURL(b);
        })
      this.newCompany.photo = ""+res
    }     
  }

  breakArray(arr){
    return arr.join(' • ')
  }

  // openDialogCompany() {
  //   const dialogRef = this.dialog.open(AddCompany);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }
  // openDialogJob(){
  //   const dialogRef = this.dialog.open(AddJob);
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log(`Dialog result: ${result}`);
  //   // });
  // }
}


// @Component({
//   selector: 'add-company',
//   templateUrl: './add-company.html'
// })

// export class AddCompany {
//   constructor() { }

//   ngOnInit(): void {
//   }
// }

// @Component({
//   selector: 'add-job',
//   templateUrl: './add-job.html'
// })

// export class AddJob {

// }