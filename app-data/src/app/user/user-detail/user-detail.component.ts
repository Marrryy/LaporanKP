import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  id;
  user;
  Rank = [];
  edit = false;
  newPass = {
    "password":"",
    "re":""
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public userService: UserService
  ) {}
  ngOnInit() {
    // const routeParams = this.route.snapshot.paramMap;
    // this.id = this.userService.user.rank > 0 ? this.userService.user.id : routeParams.get('id');
    // this.user = this.userService.user.rank > 0 ? this.userService.user : this.userService.findDataUserById(this.id);
    this.id = this.userService.user.id ;
    this.user = this.userService.findDataUserById(this.id);
    this.Rank = this.userService.Rank;
  }
  async toggleEdit(){
    this.edit = !this.edit;
  }
  async change(){
    if(this.newPass.password != ""){
      if(this.newPass.password == this.newPass.re ){
        await this.userService.updateDataFromAPI( this.id, {'password':this.newPass.password})
        alert("Password telah diubah")
        this.newPass = {
          "password":"",
          "re":""
        };
        this.edit = !this.edit;
      }else{
        alert("Password tidak sama")
      }
    }
  }
}
