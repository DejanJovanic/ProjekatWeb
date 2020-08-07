import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';

@Component({
  selector: 'app-user-preview',
  templateUrl: './user-preview.component.html',
  styleUrls: ['./user-preview.component.css']
})
export class UserPreviewComponent implements OnInit {

  user : any;
  isAirlineAdmin : boolean;
  isRentACarAdmin : boolean
  constructor(private cache: UserCacheService) { }

  ngOnInit(): void {
    this.user = this.cache.currentUser;
    if(this.user instanceof AirlineAdmin)
      this.isAirlineAdmin = true;
    
    

  }

}
