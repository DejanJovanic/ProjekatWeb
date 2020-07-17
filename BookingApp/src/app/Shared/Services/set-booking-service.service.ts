import { Injectable } from '@angular/core';
import { UserReservation } from '../Model/Common/UserReservation.model';
import { FlightReservation } from '../Model/Airlines/FlightReservation.model';
import { CarReservation } from '../Model/RentACars/CarReservation.model';
import { SetFlightReservationService } from './SetFlightReservationService';
import { AirlineDatabaseService } from '../Model/Airlines/Database/airline-database.service';
import { SeatStatus } from '../Model/Airlines/SeatStatus.model';
import { TicketNetwork } from '../Model/Airlines/TicketNetwork.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetBookingServiceService implements  SetFlightReservationService {
    currentReservation : UserReservation
  constructor(private client : HttpClient) { 
    this.currentReservation = new UserReservation();
  }

  public SetFlightReservation(reservation : TicketNetwork[]) : void{
    this.currentReservation.flight = reservation;
  }

  public SetCarReservation(reservation : CarReservation) : void{
    this.currentReservation.car = reservation;
  }


  public SendCurrentReservation(): Observable<boolean>{
 /*    let company = this.airlineDB.companies.find(item => item.id == this.currentReservation.flight.flight.airline.id);
    let flight = company.flightsDatabases.find(item => item.id == this.currentReservation.flight.flight.id);
    for(let item of this.currentReservation.flight.tickets){
      flight.details.seats.seats[item.row][item.column] = SeatStatus.Taken;
      flight.soldTickets.push(item);
    }
    */
    
    return this.client.post('http://localhost:50000/api/FlightReservation/',{ tickets : this.currentReservation.flight},
    ).pipe(tap(_ => {
      this.currentReservation.car = null;
      this.currentReservation.flight = null;
    }),map(i => i ? true : false));
  
  }


}
