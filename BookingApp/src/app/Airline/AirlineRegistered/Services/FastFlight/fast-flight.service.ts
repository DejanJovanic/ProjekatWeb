import { Injectable } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AirlineNetworkService } from 'src/app/Airline/AirlineShared/Services/AirlineNetwork/airline-network.service';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { tap, map } from 'rxjs/operators';

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
    this.network.getFastFlights(airlineId).subscribe(i =>{
      for(let a of i){
        a.flight.airline = a.airline
        a.flight.isFromFastFlight = true;
        a.flight.isFromSearch = false;
          if(a.flight.stopsLocations){
            a.flight.numberOfStops = a.flight.stopsLocations.length
          }
          else{
            a.flight.numberOfStops = 0
            a.flight.stopsLocations = []
          }
      }
      this.fastFlights.next(i)
    } );
  }

  SendFastFlightReservation(airlineId : number,username : string,fastFlightId : number,extras : Extra[],loadWeight : number,passportNumber : string) : Observable<FastFlight>{
    return this.network.SendFastFlightReservation(airlineId,username,fastFlightId,extras.map(i => i.id),loadWeight,passportNumber)
  }

  public GetFastFlightReservations(){
    return this.network.GetFastFlightReservations().pipe(map(i =>{
      for(let a of i){
        a.flight.isFromSearch = false;
        a.flight.airline = a.airline
        if(a.flight.stopsLocations){
          a.flight.numberOfStops = a.flight.stopsLocations.length
        }
        else{
          a.flight.numberOfStops = 0
          a.flight.stopsLocations = []
        }
      }
      return i;
    }),tap(i => this.user.fastFlightReservations.next(i)));
  }

  public CancelFastFlightReservation(airlineId : number,fastFlightId : number){
    return this.network.CancelFastFlightReservation(airlineId,fastFlightId)
  }
}
