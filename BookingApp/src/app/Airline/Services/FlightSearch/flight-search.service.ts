import { Injectable } from '@angular/core';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { Observable, from, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineNetworkService } from '../AirlineNetwork/airline-network.service';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private cache : AirlineCacheService,private network : AirlineNetworkService) { }

  getResults(params : FlightSearchParams) : Observable<Flight[]>{
    return this.network.getFlights(params).pipe(map( item =>{
      this.cache.airlines = item;
      let flights = []
      for(let a of item){
        for(let b of a.flights){
          flights.push(b);
        }
      }
      this.cache.flights = flights;
      return flights;
    }))
  }
}
