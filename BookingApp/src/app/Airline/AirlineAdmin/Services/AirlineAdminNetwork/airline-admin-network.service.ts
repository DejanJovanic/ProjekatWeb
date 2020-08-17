import { Injectable } from '@angular/core';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, of } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { FastFlightAdd } from 'src/app/Shared/Model/Airlines/FastFlightAdd.model';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { AirlineDataResource } from 'src/app/Shared/Model/Airlines/AirlineDataResource.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminNetworkService {

  constructor(private userData : UserCacheService,private cache : AirlineCacheService,private db : AirlineDatabaseService,private users : UserDatabaseService,
    private client : HttpClient) { }

  public GetAirlineData() : Observable<AirlineCompany>{
   return this.client.get<AirlineCompany>('http://localhost:50000/api/Airline',
    {
       params :  new HttpParams().set('airlineId',((this.userData.currentUser as AirlineAdmin).airlineID).toString())
    }
   )
  }
  public GetData() :Observable<AirlineDataResource>{
    return this.client.get<AirlineDataResource>('http://localhost:50000/api/Airline/GetData',
    {
       params :  new HttpParams().set('airlineId',((this.userData.currentUser as AirlineAdmin).airlineID).toString())
    }
   )
  }
  getFlightDetails(id : number) : Observable<FlightDetails>{
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
  public RemoveSeat(row : number,column : number, flightId : number){
    return this.client.delete<Flight>('http://localhost:50000/api/Seat',
    {
      params :  new HttpParams().set('flightId',flightId.toString()).set('row',row.toString()).set('column',column.toString())
   })
  }

  public AddSeats(rowTop : number,rowBottom : number, columnLeft : number,columnRight : number, flightId : number){
    return this.client.post<Flight>('http://localhost:50000/api/Seat',
      { 
        rowsTop : rowTop,
        rowsBottom : rowBottom,
        ColumnsLeft : columnLeft,
        ColumnsRight : columnRight,
        flightId : flightId
      }
    )
  }
  public DisableSeat(row : number,column : number, flightId : number){
    return this.client.put<Flight>('http://localhost:50000/api/Seat',{row:row,column:column,flightId:flightId})
  }
  public SetFlight(flight : Flight) : Observable<boolean>{
    return this.client.post<boolean>('http://localhost:50000/api/Flight',flight).pipe(map(i => i ? true : false))
  }
  public SetAirplane(airplane : Airplane) : Observable<Airplane>{
    return this.client.post<Airplane>('http://localhost:50000/api/Airplane/Add',airplane);
  }

  public EditAirlineCompany(company : AirlineCompany) : Observable<AirlineCompany>{
    return this.client.post<AirlineCompany>('http://localhost:50000/api/Airline/Edit',company).pipe(map(i =>{
      let temp = new AirlineCompany();
      temp = i;
      return temp;
    }))
  }

  public EditFastReservationSeats(params : FastFlightAdd) : Observable<FastFlight>{
    return this.client.post<FastFlight>('http://localhost:50000/api/FastFlight',params)
  }
}
