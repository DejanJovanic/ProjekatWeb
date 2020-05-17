import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Subscription } from 'rxjs';
import { SetFastFlightSeatsService } from '../Services/SetFastFlightSeats/set-fast-flight-seats.service';

@Component({
  selector: 'app-edit-fast-reservation-seats',
  templateUrl: './edit-fast-reservation-seats.component.html',
  styleUrls: ['./edit-fast-reservation-seats.component.css']
})
export class EditFastReservationSeatsComponent implements OnInit, OnDestroy {

  details : FlightDetails
  seats : Seats
  selectedSeats : Ticket[] = []
  sub : Subscription
  SeatDisplayState = SeatDisplayState;
  constructor(private router : Router,private route : ActivatedRoute,private service : SetFastFlightSeatsService) { }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.seats = this.details.seats;
    })
  }

  onButtonClicked(){
    this.sub = this.service.EditFastReservationSeats(this.route.snapshot.params.id,this.selectedSeats.map(i => ({row : i.row, column : i.column, index : i.seatIndex}))).subscribe(i =>{
      if(i){
        this.router.navigate(['']);
      }
    })
  }

}
