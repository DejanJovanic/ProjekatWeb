import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { SetBookingServiceService } from 'src/app/Shared/Services/set-booking-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-reservation-confirmation',
  templateUrl: './flight-reservation-confirmation.component.html',
  styleUrls: ['./flight-reservation-confirmation.component.css']
})
export class FlightReservationConfirmationComponent implements OnInit {

  public tickets : Ticket[]
  constructor(private router : Router,private service : FlightReservationService,private bookingService : SetBookingServiceService) { 
    this.tickets = service.reservation.tickets;
    for(let item of this.tickets){
      item.price = this.service.reservation.flight.price;
    }
  }

  ngOnInit(): void {
  }

  SetReservation(){
    this.bookingService.SetFlightReservation(this.service.reservation);
    this.bookingService.SendCurrentReservation();
    this.service.reservation = null;
    this.router.navigate(['']);
    sessionStorage.removeItem("choosenFriends")
  }

}
