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
    if(localStorage["Role"] != null){
      this.loggedIn = true;
      this.username = localStorage["username"];
    }
   }
   Logout(){
     localStorage.clear();
     //this.loggedIn = false;
     this.router.navigateByUrl('/Login', {skipLocationChange: true})
     .then(() => this.router.navigate(['/main/Airlines']));
    this.user.currentUser = null;
    this.user.friends.next(null);
    this.airlines.airlines.next(null); 
   }
   Preview(){
    this.router.navigate(['UserPreview']);
   }
  ngOnInit(): void {
    if(localStorage["Role"] == null)
    {
      this.links = [
        {title : "Flights" , route : "Airlines"}
        
      ];
      this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
    }
    else{
      switch(localStorage["Role"]){
        case "User":
          this.links = [
            {title : "Flights" , route : "Airlines"},
            {title : "Friends" , route : "Friends"},
            {title : "Reservations", route : "Reservations"}
          ];
          this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
          break;
        case "AirlineAdmin":
          this.links = [
            {title : "Flights", route : "AirlineAdmin"},
            {title : "Airplanes", route : "Airplanes"},
            {title : "Company preview", route: 'CompanyPreview'},
            {title : "Stats", route: 'Stats'}
          ];
          this.router.navigate(['AirlineAdmin'],{ relativeTo : this.activeRoute});
          break;

      }
    }
   
  }

}
