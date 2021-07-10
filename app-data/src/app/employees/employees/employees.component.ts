import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/employees.service';
import { UserService } from '../../user.service';

// import {NgxImageCompressService} from 'ngx-image-compress';

import { ImageCompressor } from 'image-compressor';
    
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  imageCompressor = new ImageCompressor;

  dataEmployee;
  newEmployee = {
    "name": "",
    "postBy": this.userService.user.id,
    "photo": "",
    "profileDesc":"",
    "email" : "",
    "telp" : "",
    "yearsExp" : 0,
    "skill": [], 
    "lastEducation": "",
    "language" : "",
    "salaryExpect":"",
    "location": "",
    "status": 0
  };
  Level;

  Avalaibility;

  constructor(
    private router: Router, 
    public userService: UserService, 
    public employeesService : EmployeesService,
    // private imageCompress: NgxImageCompressService
    ) { }

  ngOnInit(): void {
    // this.dataEmployee = this.employeesService.dataEmployee
    this.Level = this.employeesService.Level
    this.Avalaibility = this.employeesService.Avalaibility
  }
  removeItem(nameVariable, index){
    switch(nameVariable){
      // case 'language':
      //   this.Language.splice(index,1)
      //   break;
      case 'skill':
        this.newEmployee.skill.splice(index,1)
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
        this.newEmployee.skill.push({"name":newItem, "lvl":lvlItem});
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
      this.newEmployee.photo = ""+res
      // console.log(this.newEmployee)
    }     
  }

  proceedCompressedImage (compressedSrc) {
    console.log(compressedSrc)
    // ...
  }
  showIMG(arrayBuffer){
    console.log(arrayBuffer)
    // console.log(arrayBuffer)
    //  console.log('data:image/jpg;base64,' + btoa(String.fromCharCode(...new Uint8Array(arrayBuffer.data))))
    //  return 'data:image/jpg;base64,' + btoa(String.fromCharCode(...new Uint8Array(arrayBuffer.data)));
  }


  async save(){
    await this.employeesService.postDataFromAPI(this.newEmployee)
    this.newEmployee = {
      "name": "",
      "postBy": this.userService.user.id,
      "photo": "",
      "profileDesc":"",
      "email" : "",
      "telp" : "",
      "yearsExp" : 0,
      "skill": [], 
      "lastEducation": "",
      "language" : "",
      "salaryExpect":"",
      "location": "",
      "status": 0
    };
  }
  
}
