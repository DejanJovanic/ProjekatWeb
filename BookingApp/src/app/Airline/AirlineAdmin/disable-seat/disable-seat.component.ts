import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineAdminNetworkService } from '../Services/AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { Subscription } from 'rxjs';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';

@Component({
  selector: 'app-disable-seat',
  templateUrl: './disable-seat.component.html',
  styleUrls: ['./disable-seat.component.css']
})
export class DisableSeatComponent implements OnInit, OnDestroy {

  flight : Flight
  sub : Subscription;
  SeatDisplayState = SeatDisplayState;
  seats : Seats;
  selectedSeats : Ticket[] = []
  constructor(private router : Router,private network : AirlineAdminNetworkService,private cache : AirlineCacheService,private route : ActivatedRoute,private builder : FormBuilder) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {

      this.sub = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.seats = data.details.seats;
    })    
  }

  OnClick(){
      this.network.DisableSeat(+this.selectedSeats[0].row,+this.selectedSeats[0].column,+this.route.snapshot.params.id).subscribe(i =>{
        this.router.navigate(['']);
      })
    
  }

}
