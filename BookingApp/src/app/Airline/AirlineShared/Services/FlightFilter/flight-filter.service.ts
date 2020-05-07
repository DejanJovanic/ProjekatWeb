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
    if(!isNaN(params.price) && params.price != null){
      return item.price == params.price;
    }
    else{
      return true;
    }
  }
}
