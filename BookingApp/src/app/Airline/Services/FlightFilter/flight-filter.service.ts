import { Injectable } from '@angular/core';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';

@Injectable({
  providedIn: 'root'
})
export class FlightFilterService {

  constructor(private cache : AirlineCacheService) { }

  filter(params){
    return this.cache.flights.filter(item => this.filterFunction(item,params))
  }
  private filterFunction(item : Flight, params : FlightFilterParams){
    if(!isNaN(params.price) && params.price != null){
      return item.price == params.price;
    }
    else{
      return true;
    }
  }
}
