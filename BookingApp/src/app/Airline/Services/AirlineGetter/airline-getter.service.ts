import { Injectable } from '@angular/core';
import { AirlineCompany} from "../../../Shared/Model/Airlines/AirlineCompany.model"
import { range, Observable, combineLatest } from 'rxjs';
import { Airline } from 'src/app/Shared/Model/Airlines/Airline.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { FlightSearchService } from '../FlightSearch/flight-search.service';
import { FlightFilterService } from '../FlightFilter/flight-filter.service';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { pluck, concat, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AirlineGetterService {
  
  public flights : Observable<Flight[]>
  constructor(private cache : AirlineCacheService,private search : FlightSearchService, private filter : FlightFilterService){
    this.flights = combineLatest(this.cache.airlines.pipe(map(i =>{
      let flights = new Array<Flight>();
      for(let airline of i){
        for(let flight of airline.flights){
          flights.push(flight);
        }
      }
      return flights;
    })),this.filter.filter,
      (flights : Flight[], params : FlightFilterParams) =>{
          if(params == null) return flights
          else
            return  flights.filter( value => this.filter.filterFunction(value,params))
      })  
      
  }
}
