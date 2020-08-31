import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { ActivatedRoute } from '@angular/router';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  private obs : Subscription;
  public flight : Flight
  public details : FlightDetails
  public seats : Seats
  public isUser : boolean;
  constructor(private route : ActivatedRoute,private cache : AirlineCacheService) { }

  ngOnInit(): void {
    if(localStorage['Role']){
      if(localStorage['Role'] === "User")
      {
        this.isUser = true;
      }
      else{
        this.isUser = false;
      }
    }
    this.obs = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.seats = this.details.seats;
      for(let a of this.cache.airlines.getValue()){
        for(let b of a.flights){
          if(b.id == this.route.snapshot.params.id){
            this.flight = b;
            break;
          }
        }
      }
      
    })
  }

}
