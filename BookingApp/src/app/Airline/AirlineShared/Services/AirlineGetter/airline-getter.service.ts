import { Injectable } from '@angular/core';
import { AirlineCompany} from "../../../../Shared/Model/Airlines/AirlineCompany.model"
import { range, Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Airline } from 'src/app/Shared/Model/Airlines/Airline.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { FlightSearchService } from '../../../AirlineRegistered/Services/FlightSearch/flight-search.service';
import { FlightFilterService } from '../FlightFilter/flight-filter.service';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { pluck, concat, map } from 'rxjs/operators';
import { SortParameter } from 'src/app/Shared/Model/Airlines/SortParameter.model';

@Injectable({
  providedIn: 'root'
})

export class AirlineGetterService {
  
  public flights : Observable<Flight[]>
  public sort : BehaviorSubject<SortParameter>;
  constructor(private cache : AirlineCacheService,private search : FlightSearchService, private filter : FlightFilterService){
    this.sort = new BehaviorSubject(null);
    this.flights = combineLatest(this.cache.airlines.pipe(map(i =>{
      if(i){
        let flights = new Array<Flight>();
        for(let airline of i){
          if(airline.flights)
            for(let flight of airline.flights){
              flight.isFromSearch = true;
              flights.push(flight);
          }
        }
        return flights;
      }
      else return null;
      
    })),this.filter.filter,this.sort,
      (flights : Flight[], params : FlightFilterParams,sort : SortParameter) =>{
        if(flights == null) return null
          if(params == null){
            if(sort == null)
              return flights;
            else{
              switch(sort){
                case SortParameter.AirlineAZ:
                  return flights.sort((a,b) =>  (a.airline.name > b.airline.name ? 1 : -1))
                  case SortParameter.AirlineZA:
                    return flights.sort((a,b) =>  (a.airline.name > b.airline.name ? -1 : 1))
                  case SortParameter.PriceAscending:
                    return flights.sort((a,b) =>  (a.price - b.price ))
                  case SortParameter.PriceDescending:
                    return flights.sort((a,b) =>  (b.price - a.price ))

              }
            }
          } 
          else{
            let ret = flights.filter( value => this.filter.filterFunction(value,params))
            if(sort == null)
              return ret;
            else{
              switch(sort){
                case SortParameter.AirlineAZ:
                  return ret.sort((a,b) =>  (a.airline.name > b.airline.name ? 1 : -1))
                  case SortParameter.AirlineZA:
                    return ret.sort((a,b) =>  (a.airline.name > b.airline.name ? -1 : 1))
                  case SortParameter.PriceAscending:
                    return ret.sort((a,b) =>  (a.price - b.price ))
                  case SortParameter.PriceDescending:
                    return ret.sort((a,b) =>  (b.price - a.price ))

              }
            }
          }
            
      })
      
     
      
  }
}
