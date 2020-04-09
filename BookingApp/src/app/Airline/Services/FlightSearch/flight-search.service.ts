import { Injectable } from '@angular/core';
import { AirlineCacheService } from '../AirlineCache/airline-cache.service';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { Observable, from, of } from 'rxjs';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  constructor(private cache : AirlineCacheService) { }

  getResults(params : FlightSearchParams) : Observable<AirlineCompany[]>{
    return of(this.cache.airlines);
  }
}
