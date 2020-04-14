import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-seat-assignment',
  templateUrl: './seat-assignment.component.html',
  styleUrls: ['./seat-assignment.component.css']
})
export class SeatAssignmentComponent implements OnInit {

  public isOk : boolean;
  public reservation : FlightReservation;
  public tickets : Ticket[]

  constructor(private service : FlightReservationService) {
   }

  ngOnInit(): void {
    this.reservation = this.service.reservation;
    this.tickets = this.reservation.tickets;
  }
  public IsOk(){
    for(let a of this.reservation.tickets){
      if(a.details == null){
        return false;
      }
    }
    return true;
  }

}
