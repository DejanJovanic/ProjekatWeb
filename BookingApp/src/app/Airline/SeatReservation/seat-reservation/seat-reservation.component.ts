import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Subscription } from 'rxjs';
import { SeatDisplay } from 'src/app/Shared/Model/Airlines/SeatDisplay.model';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit, OnDestroy {

  public reservation : FlightReservation
  public seats : Seats
  private details : FlightDetails
  private obs : Subscription;
  public clicked : any;
  public selectedSeats : Ticket[] = []
  SeatDisplayState = SeatDisplayState;
  constructor(private route : ActivatedRoute,
    private reservationService : FlightReservationService, private router : Router
    ,private cache : AirlineCacheService) {
    this.reservation = new FlightReservation()
  }
  ngOnDestroy(): void {
    if(this.obs) this.obs.unsubscribe()
  }
  ngOnInit(): void {
    this.obs = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.seats = this.details.seats;
    })
  }

  onButtonClicked(){
    if(this.reservation != null && this.selectedSeats.length > 0){
      this.reservation.flight = null;

      this.reservation.tickets = this.selectedSeats;
      this.reservationService.reservation = this.reservation;
      sessionStorage["currentReservation"] = JSON.stringify(this.reservation);
      this.router.navigate(['/seatAssignment',this.route.snapshot.params.id]);

    }
  }

 
}
