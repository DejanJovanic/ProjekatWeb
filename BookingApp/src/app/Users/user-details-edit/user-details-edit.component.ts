import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCacheService } from '../Services/UserCache/user-cache.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { UserNetworkService } from '../Services/UserNetwork/user-network.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserDetailsService } from '../Services/UserDetails/user-details.service';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  form : FormGroup
  isAirlineAdmin : boolean;
  isRentACarAdmin : boolean
  constructor(private cache : UserCacheService,private builder : FormBuilder,private network : UserNetworkService,private router : Router,private service : UserDetailsService) { }

  ngOnInit(): void {
    let user = this.cache.currentUser;
    if(user instanceof AirlineAdmin)
      this.isAirlineAdmin = true;
    this.form = this.builder.group({
      phoneNumber : [user.phoneNumber ? user.phoneNumber : '',[Validators.required,Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')]],
      name : [user.name ? user.name : '' , [Validators.required,Validators.pattern(/^[a-zA-Z-' ]+?$/)]],
      lastName : [user.lastName ? user.lastName : '' , [Validators.required,Validators.pattern(/^[a-zA-Z-' ]+?$/)]],
      city : [user.city ? user.city : '' , [Validators.required,Validators.pattern(/^[a-zA-Z-' ]+?$/)]]
    })
  }

  Submit(){
    if(this.form.valid){
      if(this.isAirlineAdmin)
        this.service.EditAirlineAdminDetails(this.form.value).subscribe(_ =>{
          this.router.navigate(['/main'])
        })
      else
      this.service.EditUserDetails(this.form.value).subscribe(_ =>{
          this.router.navigate(['/main'])
        })
    }
  }

}
