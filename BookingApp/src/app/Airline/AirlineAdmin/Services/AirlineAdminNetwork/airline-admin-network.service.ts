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

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminNetworkService {

  constructor(private userData : UserCacheService,private cache : AirlineCacheService,private db : AirlineDatabaseService,private users : UserDatabaseService,
    private client : HttpClient) { }

  public GetAirlineData() : Observable<AirlineCompany>{
   return this.client.get<AirlineCompany>('http://localhost:50000/api/Airline/Get',
    {
       params :  new HttpParams().set('airlineId',((this.userData.currentUser as AirlineAdmin).airlineID).toString())
    }
   )
  }
  public SetFlight(flight : Flight) : Observable<boolean>{
    return this.client.post<boolean>('http://localhost:50000/api/Flight/Add',flight)
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

  public EditFastReservationSeats(flightID : number, seats : {row : number,column : number, index : number}[]) : Observable<boolean>{
    return of(true);
  }
}
