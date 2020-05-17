import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetFastFlightSeatsService {

  constructor(private network : AirlineAdminNetworkService) { }

  public EditFastReservationSeats(flightID : number, seats : {row : number,column : number, index : number}[]) : Observable<boolean>{
    return this.network.EditFastReservationSeats(flightID,seats);
  }

}
