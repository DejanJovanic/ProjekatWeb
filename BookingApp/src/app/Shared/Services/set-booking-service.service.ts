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
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';

@Injectable({
  providedIn: 'root'
})
export class SetBookingServiceService implements  SetFlightReservationService {
    currentReservation : UserReservation
  constructor(private client : HttpClient,private user : UserCacheService) { 
    this.currentReservation = new UserReservation();
  }

  public SetFlightReservation(reservation : FlightReservation) : void{
    let reservations = []
    for(let item of reservation.tickets){
      let temp = new TicketNetwork();
      temp.row = item.row;
      temp.column = item.column;
      temp.airlineId = reservation.flight.airline.id;
      temp.flightId = reservation.flight.id;
      temp.ticketOwnerUsername = item.details.username;
      temp.selectedExtras = []
      for(let a of item.extras){
        temp.selectedExtras.push(a.id);
      }
      
      if(item.luggageWeigth)
        temp.loadWeight = item.luggageWeigth;
      else
        temp.loadWeight = 0;
      if(item.details.username != this.user.currentUser.username)
        temp.invitedByUsername = this.user.currentUser.username;
      else
        temp.invitedByUsername = "";
      temp.name = item.details.name;
      temp.lastName = item.details.lastName;
      temp.passport = item.details.passportNum;
      reservations.push(temp);
    }
    this.currentReservation.flight = reservations;
  }

  public SetCarReservation(reservation : CarReservation) : void{
    this.currentReservation.car = reservation;
  }


  public SendCurrentReservation(): Observable<boolean>{
        
    return this.client.post('http://localhost:50000/api/FlightReservation/',{ tickets : this.currentReservation.flight},
    ).pipe(tap(_ => {
      this.currentReservation.car = null;
      this.currentReservation.flight = null;
    }),map(i => i ? true : false));
  
  }


}
