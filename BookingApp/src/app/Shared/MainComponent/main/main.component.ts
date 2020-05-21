import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public links;
  public username : string;
  public loggedIn : boolean
  constructor(private router : Router,private activeRoute : ActivatedRoute
    ,private user : UserCacheService,private airlines : AirlineCacheService) {
    if(sessionStorage["Role"] != null){
      this.loggedIn = true;
      this.username = sessionStorage["username"];
    }
   }
   Logout(){
     sessionStorage.clear();
     //this.loggedIn = false;
     this.router.navigateByUrl('/Login', {skipLocationChange: true})
     .then(() => this.router.navigate(['/main/Airlines']));
    this.user.currentUser = null;
    this.user.friends.next(null);
    this.airlines.airlines.next(null); 
   }
  ngOnInit(): void {
    if(sessionStorage["Role"] == null)
    {
      this.links = [
        {title : "Flights" , route : "Airlines"}
        
      ];
      this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
    }
    else{
      switch(sessionStorage["Role"]){
        case "User":
          this.links = [
            {title : "Flights" , route : "Airlines"},
            {title : "Friends" , route : "Friends"}
          ];
          this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
          break;
        case "AirlineAdmin":
          this.links = [
            {title : "Fligts", route : "AirlineAdmin"},
            {title : "Airplanes", route : "Airplanes"},
            {title : "Company preview", route: 'CompanyPreview'}
          ];
          this.router.navigate(['AirlineAdmin'],{ relativeTo : this.activeRoute});
          break;

      }
    }
   
  }

}
