import { Injectable } from '@angular/core';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, from, forkJoin, of } from 'rxjs';
import { filter, map, merge, concat } from 'rxjs/operators';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Airline } from 'src/app/Shared/Model/Airlines/Airline.model';
import { TicketNetwork } from 'src/app/Shared/Model/Airlines/TicketNetwork.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { ReservationConfirmation } from 'src/app/Shared/Model/Airlines/ReservationConfirmation.model';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineNetworkService {

  constructor(private db : AirlineDatabaseService,private client : HttpClient) { }

  getFastFlights(airlineId : number) : Observable<FastFlight[]>{
    return this.client.get<FastFlight[]>('http://localhost:50000/api/FastFlight',
      {
        params :  new HttpParams().set('airlineId',airlineId.toString())
      }
    )
  }

  GetFastFlightReservations(){
    return this.client.get<FastFlight[]>('http://localhost:50000/api/FastFlightReservation' )
   
  }

  CancelFastFlightReservation(airlineId : number,fastFlightId : number){
    return this.client.delete<FastFlight>('http://localhost:50000/api/FastFlightReservation',
    {
      params :  new HttpParams().set('airlineId',airlineId.toString()).set('fastFlightId',fastFlightId.toString())
    }
  )
  }

  SendFastFlightReservation(airlineId : number,username : string,fastFlightId : number,extras : number[],loadWeight : number,passportNumber : string) : Observable<FastFlight>{
    return this.client.post<FastFlight>('http://localhost:50000/api/FastFlightReservation',
    {
      airlineId : airlineId,
      username : username,
      fastFlightId : fastFlightId,
      paidExtras : extras,
      loadWeight : loadWeight,
      passportNumber : passportNumber
    })
  }

  getFlights(params : FlightSearchParams)  {
    return this.client.post<{airlines : AirlineCompany[]}>('http://localhost:50000/api/Airline/Search',params).pipe(map(i =>{
      for(let a of i.airlines){
        for(let b of a.flights){
          b.airline = a;
          if(b.stopsLocations){
            b.numberOfStops = b.stopsLocations.length
          }
          else{
            b.numberOfStops = 0
            b.stopsLocations = []
          }
        }
      }
      return i.airlines;
    } ))
  }
  
  getDetails(id : number) : Observable<FlightDetails>{
    return this.client.get<FlightDetails>('http://localhost:50000/api/Flight/Details',
      {
        params :  new HttpParams().set('flightId',(id.toString()))
      }
    ).pipe(map(i =>{
      i.seats = new Seats();
      i.seats.CreateSeatsAirplane(i.airplane);
      return i;
    }))
  }

  getReservations() : Observable<{airline : AirlineCompany, flight : Flight, tickets : TicketNetwork[]}[]>{
    return this.client.get<{airline : AirlineCompany, flight : Flight, tickets : TicketNetwork[]}[]>('http://localhost:50000/api/FlightReservation')
  }

  confirmReservation(data : ReservationConfirmation) : Observable<boolean>{
    return this.client.post<boolean>('http://localhost:50000/api/FlightReservation/Accept',data).pipe(map(i => i ? true : false))
  }

  rejectReservation(data : {airlineId : number,flightId : number, ticketId : number}) : Observable<boolean>{
    return this.client.post<boolean>('http://localhost:50000/api/FlightReservation/Reject',data).pipe(map(i => i ? true : false))
  }
   cancelReservation(data : {airlineId : number,flightId : number, ticketId : number}) : Observable<boolean>{
    return this.client.post<boolean>('http://localhost:50000/api/FlightReservation/Cancel',data).pipe(map(i => i ? true : false))
  }
}
