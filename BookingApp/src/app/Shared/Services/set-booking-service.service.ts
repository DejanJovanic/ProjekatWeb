import { Injectable } from '@angular/core';
import { UserReservation } from '../Model/Common/UserReservation.model';
import { FlightReservation } from '../Model/Airlines/FlightReservation.model';
import { CarReservation } from '../Model/RentACars/CarReservation.model';
import { SetFlightReservationService } from './SetFlightReservationService';
import { AirlineDatabaseService } from '../Model/Airlines/Database/airline-database.service';
import { SeatStatus } from '../Model/Airlines/SeatStatus.model';

@Injectable({
  providedIn: 'root'
})
export class SetBookingServiceService implements SetFlightReservationService, SetFlightReservationService {
    currentReservation : UserReservation
  constructor(private airlineDB : AirlineDatabaseService) { 
    this.currentReservation = new UserReservation();
  }

  public SetFlightReservation(reservation : FlightReservation) : void{
    this.currentReservation.flight = reservation;
  }

  public SetCarReservation(reservation : CarReservation) : void{
    this.currentReservation.car = reservation;
  }


  public SendCurrentReservation(): void{
    let company = this.airlineDB.companies.find(item => item.id == this.currentReservation.flight.flight.airline.id);
    let flight = company.flightsDatabases.find(item => item.id == this.currentReservation.flight.flight.id);
    for(let item of this.currentReservation.flight.tickets){
      flight.details.seats.seats[item.row][item.column] = SeatStatus.Taken;
      flight.soldTickets.push(item);
    }
    
    this.currentReservation.car = null;
    this.currentReservation.flight = null;
  }


}
