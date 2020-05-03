import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { FlightSearchService } from '../FlightSearch/flight-search.service';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightResolverService implements Resolve<any> {

  constructor(private cache : AirlineCacheService, private search : FlightSearchService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    if(this.cache.airlines.getValue() != null){
      return empty()
    }
    else{
      return this.search.getResults(null);
    }
  }
}
