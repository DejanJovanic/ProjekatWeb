import { Injectable } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AirlineNetworkService } from 'src/app/Airline/AirlineShared/Services/AirlineNetwork/airline-network.service';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FastFlightService {

  public fastFlights : BehaviorSubject<FastFlight[]>
  public airlineId : number;
  constructor(private network : AirlineNetworkService,private user : UserCacheService) {
    this.fastFlights = new BehaviorSubject(null);
   }

  public GetFastFlights(airlineId : number){
    this.network.getFastFlights(airlineId).subscribe(i => this.fastFlights.next(i));
  }

  SendFastFlightReservation(airlineId : number,username : string,fastFlightId : number,extras : Extra[],loadWeight : number,passportNumber : string) : Observable<FastFlight>{
    return this.network.SendFastFlightReservation(airlineId,username,fastFlightId,extras.map(i => i.id),loadWeight,passportNumber)
  }

  public GetFastFlightReservations(){
    return this.network.GetFastFlightReservations().pipe(tap(i => this.user.fastFlightReservations.next(i)));
  }

  public CancelFastFlightReservation(airlineId : number,fastFlightId : number){
    return this.network.CancelFastFlightReservation(airlineId,fastFlightId)
  }
}
