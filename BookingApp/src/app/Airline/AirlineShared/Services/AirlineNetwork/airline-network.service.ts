import { Injectable } from '@angular/core';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, from, forkJoin, of } from 'rxjs';
import { filter, map, merge, concat } from 'rxjs/operators';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AirlineNetworkService {

  constructor(private db : AirlineDatabaseService,private client : HttpClient) { }

  getFlights(params : FlightSearchParams)  {
    return this.client.post<{airlines : AirlineCompany[]}>('http://localhost:50000/api/Airline/Search',params).pipe(map(i => i.airlines))
  }
  
  getDetails(id : number) : Observable<FlightDetails>{
    for(let a of this.db.companies){
      for(let b of a.flightsDatabases){
        if(b.id == id){
          return  of(b.details);
        }
        
      }
    }
  }
}
