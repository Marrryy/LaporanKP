import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email="";
  password ="";
  remember = false;

  constructor(public router: Router, public userService: UserService) {
    if(localStorage.getItem('email')){
      this.email = localStorage.getItem('email')
    }
  }

  ngOnInit(): void {
  }
  
  login(){
    this.userService.validateEmail(this.password, this.email)
      .pipe(
        // catchError(err => of(err))
        catchError(err => {
          // console.log(err)
          alert('error in source. Details: ' + err.error)
          throw 'error in source. Details: ' + err.error;
        })
      )
      .subscribe((data) => {
        // this.getJobFromAPI()
        console.log(data)
        if(this.remember){
          localStorage.setItem('email', this.email)
        }else{
          localStorage.removeItem('email')
        }
        this.userService.setUser(data);
        this.router.navigate(['/dashboard']);
    }
    );
  }
  toggleRemember(){
    this.remember = !this.remember;
  }
}
