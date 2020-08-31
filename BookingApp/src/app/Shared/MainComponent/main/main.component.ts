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
  constructor(private router : Router,private activeRoute : ActivatedRoute
    ,private user : UserCacheService,private airlines : AirlineCacheService) {

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
            {title : "Reservations", route : "Reservations"},
            {title : "Invites", route : "ReservationInvites"}
          ];
          this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
          break;
        case "AirlineAdmin":
          this.links = [
            {title : "Flights", route : "AirlineAdmin"},
            {title : "Company preview", route: 'CompanyPreview'},
            {title : "Stats", route: 'Stats/AirlineRatings'}
          ];
          this.router.navigate(['AirlineAdmin'],{ relativeTo : this.activeRoute});
          break;

      }
    }
   
  }

}
