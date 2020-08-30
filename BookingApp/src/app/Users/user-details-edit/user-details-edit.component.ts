import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserCacheService } from '../Services/UserCache/user-cache.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { UserNetworkService } from '../Services/UserNetwork/user-network.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UserDetailsService } from '../Services/UserDetails/user-details.service';
import { Name } from 'src/app/Airline/AirlineShared/Validators/Name.validator';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  form : FormGroup
  isAirlineAdmin : boolean;
  isRentACarAdmin : boolean
  constructor(private background : BackgroundService,private cache : UserCacheService,private builder : FormBuilder,private network : UserNetworkService,private router : Router,private service : UserDetailsService) { }
  customErrors = {
    pattern : 'Invalid phone number'
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.UserRegistration);
  });
    let user = this.cache.currentUser;
    if(user instanceof AirlineAdmin)
      this.isAirlineAdmin = true;
    this.form = this.builder.group({
      phoneNumber : [user.phoneNumber ? user.phoneNumber : '',[Validators.required,Validators.pattern(/^[+]?([0-9]{1,12})$/)]],
      name : [user.name ? user.name : '' , [Validators.required,Name]],
      lastName : [user.lastName ? user.lastName : '' , [Validators.required,Name]],
      city : [user.city ? user.city : '' , [Validators.required,Name]]
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
