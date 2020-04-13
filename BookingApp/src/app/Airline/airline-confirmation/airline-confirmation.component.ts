import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';

@Component({
  selector: 'app-airline-confirmation',
  templateUrl: './airline-confirmation.component.html',
  styleUrls: ['./airline-confirmation.component.css']
})
export class AirlineConfirmationComponent implements OnInit {

  constructor(private service : FlightReservationService) { }

  public reservations : FlightReservation
  ngOnInit(): void {
  }

}
