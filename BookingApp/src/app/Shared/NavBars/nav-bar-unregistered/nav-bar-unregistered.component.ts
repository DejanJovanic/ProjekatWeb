import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-nav-bar-unregistered',
  templateUrl: './nav-bar-unregistered.component.html',
  styleUrls: ['./nav-bar-unregistered.component.css']
})


export class NavBarUnregisteredComponent implements OnInit {
  
  @Input() links;
  public username : string;
  public loggedIn : boolean
  constructor(private router : Router
    ,private user : UserCacheService,private airlines : AirlineCacheService) {
      if(localStorage["Role"] != null){
        this.loggedIn = true;
        this.username = localStorage["username"];
      }
     }

  ngOnInit(): void {
  }
  Logout(){
    localStorage.clear();
    this.loggedIn = false;
    this.router.navigateByUrl('/Login', {skipLocationChange: true})
    .then(() => this.router.navigate(['/main/Airlines']));
   this.user.currentUser = null;
   this.user.friends.next(null);
   this.airlines.airlines.next(null); 
  }
  Preview(){
   this.router.navigate(['UserPreview']);
  }
}
