import { Injectable } from '@angular/core';
import { UserReservation } from '../Model/Common/UserReservation.model';
import { FlightReservation } from '../Model/Airlines/FlightReservation.model';
import { CarReservation } from '../Model/RentACars/CarReservation.model';
import { SetFlightReservationService } from './SetFlightReservationService';

@Injectable({
  providedIn: 'root'
})
export class SetBookingServiceService implements SetFlightReservationService, SetFlightReservationService {
    currentReservation : UserReservation
  constructor() { 
    this.currentReservation = new UserReservation();
  }

  public SetFlightReservation(reservation : FlightReservation) : void{
    this.currentReservation.flight = reservation;
  }

  public SetCarReservation(reservation : CarReservation) : void{
    this.currentReservation.car = reservation;
  }

  public SendCurrentReservation(): void{
    // Ajax poziv ka backend-u
    this.currentReservation = null;
  }


}
