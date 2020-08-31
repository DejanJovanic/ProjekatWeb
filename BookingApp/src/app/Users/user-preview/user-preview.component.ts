import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { RentACarAdmin } from 'src/app/Shared/Model/RentACars/RentACarAdmin.model';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

  user : any;
  isAirlineAdmin : boolean;
  isRentACarAdmin : boolean
  constructor(private background : BackgroundService,private cache: UserCacheService,private router : Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.UserRegistration);
  });
    this.user = this.cache.currentUser;
    if(this.user instanceof AirlineAdmin)
      this.isAirlineAdmin = true;
    else if(this.user instanceof RentACarAdmin)
      this.isRentACarAdmin = true;
  }

  Click(){
    this.router.navigate(['changePassword/',this.user.username])
  }

}
