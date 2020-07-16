import { Injectable } from '@angular/core';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightFilterService {

  public filter : BehaviorSubject<FlightFilterParams>;
  constructor(private cache : AirlineCacheService) {
      this.filter = new BehaviorSubject<FlightFilterParams>(null);
   }

  public filterFunction(item : Flight, params : FlightFilterParams){
    if(!isNaN(params.priceFrom) && params.priceFrom != null && item.price < params.priceFrom){
      return false;
    }
    if(!isNaN(params.priceTo) && params.priceTo!= null && item.price > params.priceTo){
      return false;
    }
    return true;
  }
}
