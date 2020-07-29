import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { Observable } from 'rxjs';
import { FastFlightAdd } from 'src/app/Shared/Model/Airlines/FastFlightAdd.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SetFastFlightSeatsService {

  constructor(private network : AirlineAdminNetworkService) { }

  public EditFastReservationSeats(flightID : number,discountPercentage : number, seat : {row : number,column : number}) : Observable<boolean>{
    let params = new FastFlightAdd()
    params.row = seat.row;
    params.column = seat.column;
    params.flightId = flightID;
    params.discountPercentage = discountPercentage;
    return this.network.EditFastReservationSeats(params).pipe(map(i => i ? true : false));
  }

}
