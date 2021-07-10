import { Injectable } from '@angular/core';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user;
  dataUser;
  Rank = ["Administrator", "Company", "Employee"]

  constructor(private api : APIService) { }

  // async validateEmail(header, email){
  validateEmail(header, email){
    return this.api.getParamEmail('user', header, email)
    // return await this.api.getParamEmail('user', header, email)
  }
  findDataUserById(id){
    return this.dataUser.find(x => x.id == id)
  }

  //For Login USER
  setUser(newUser) {
    this.user = newUser;
    
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  getUser() {
    if(this.user == undefined){
      this.getUserbyLS()
    }
    return this.user;
  }

  getUserbyLS() {
    this.user =JSON.parse(localStorage.getItem('user'));
  }

  clearUser() {
    localStorage.clear()
    this.user = {'id': null ,'name': null, 'rank': null};
    return this.user;
  }

  //Get data Users on Administrator
  getUsers() {
    if(this.dataUser == undefined){
      this.getUsersbyLS()
    }
    return this.dataUser;
  }

  setUsers(newUsers){
    this.dataUser = newUsers;
    localStorage.setItem('users', JSON.stringify(newUsers))
  }

  getUsersbyLS(){
    if(localStorage.getItem('users')){
      this.dataUser =JSON.parse(localStorage.getItem('users'));
    }else{
      this.getDataUsersFromAPI(); 
    }
  }

  async getDataUsersFromAPI(){
    await this.api.get('user')
    .subscribe((data) => {
      this.setUsers(data)    
      location.reload;
      }
    );
  }

  async postDataFromAPI(newData){
    await this.api.post('user', newData)
    .subscribe((data) => {
      this.getDataUsersFromAPI()    
      // location.reload;
      }
    );
  }
  async updateDataFromAPI(id,newData){
    await this.api.put('user', id,newData)
    .subscribe((data) => {
      console.log("Success")
      this.getDataUsersFromAPI()
    }
    );
  }
}
