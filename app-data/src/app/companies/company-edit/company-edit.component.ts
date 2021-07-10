import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'src/app/companies.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService, 
    public companiesService: CompaniesService
  ) { }
  id;
  thisCompanies;

  ngOnInit(): void {
    if(this.userService.user.rank == 0){
      const routeParams = this.route.snapshot.paramMap;
      this.id = routeParams.get('id')
      this.thisCompanies = this.companiesService.findDataCompanyByID(this.id);
    }else if(this.userService.user.rank == 1){
      this.thisCompanies = this.companiesService.findDataCompanyByPostBy(this.userService.user.id);
      console.log(this.companiesService.findDataCompanyByPostBy(this.userService.user.id))
      this.id = this.thisCompanies.id
    }else {
      this.router.navigate(['/dashboard']);
    }
  }

  async save(){
    await this.companiesService.updateCompFromAPI( this.id, this.thisCompanies);
    this.router.navigate(['/companies']);
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
      this.thisCompanies.photo = ""+res
    }     
  }

}
