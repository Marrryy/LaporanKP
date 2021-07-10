import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/employees.service';
import { UserService } from 'src/app/user.service';

  
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})

export class EmployeeDetailComponent implements OnInit{
  id;
  employee;
  Avalaibility;
  Level;
  
  edit = false;
  constructor(private router: Router, private route: ActivatedRoute,public userService: UserService,  public employeesService : EmployeesService) { }
  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.id =routeParams.get('id')

    if(this.id != 0){
      this.employee = this.employeesService.findDataEmployeeById(this.id)
    }else{
      this.employee = this.employeesService.findDataEmployeeByPostBy(this.userService.user.id);
      this.id = this.employee.id
    }

    this.Level = this.employeesService.Level
    this.Avalaibility = this.employeesService.Avalaibility
  }
  checkOwnership(){
    if(this.userService.user.rank == 0 ){
      return true;
    }
    if(this.userService.user.rank == 2){
      let owner = this.employeesService.findDataEmployeeByPostBy(this.userService.user.id)
      if (owner.id == this.id){
        return true;
      }
    }
    return false;
  }
  async toggleEdit(){
    if(this.edit){
      console.log(this.employee)
      await this.employeesService.updateDataFromAPI( this.id, this.employee)
    }
    this.edit = !this.edit;
  }

  // async delete(){
  //     await this.employeesService.deleteDataFromAPI(this.id)
  //     this.router.navigate(['/employees']);
  // }
  

  removeItem(nameVariable, index){
    switch(nameVariable){
      // case 'language':
      //   this.Language.splice(index,1)
      //   break;
      case 'skill':
        this.employee.skill.splice(index,1)
        break;
      default: 
    }
  }
  insertItem(nameVariable, newItem: string, lvlItem) {
    if (newItem) {
    switch(nameVariable){
      // case 'language':
      //   this.Language.push(newItem);
      //   break;
      case 'skill':
        this.employee.skill.push({"name":newItem, "lvl":lvlItem});
        break;
      default: 
    }
  }
  }
  moneyDots(money){
    // Convert to String and add dots every 3 digits
    return money.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
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
      this.employee.photo = ""+res
    }     
  }

  @ViewChild('pdfTable') pdfTable: ElementRef;
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.pdfTable.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }
}
