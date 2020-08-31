import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminDataService {

  data : BehaviorSubject<Flight[]>
  constructor(private cache : AirlineCacheService,private network : AirlineAdminNetworkService) {
    this.data = new BehaviorSubject(null);
   }

  public GetAirlineData() : Observable<AirlineCompany>{
    return this.network.GetAirlineData().pipe(tap(i =>{
      if(i){
        let flights = [];
        for(let a of i.flights){
          if(a){
            if(a.stopsLocations){
              a.numberOfStops = a.stopsLocations.length
            }
            else
              a.numberOfStops = 0
            flights.push(a);
          }
           
          
        }
        this.data.next(flights);
      }
      else this.data.next(null);
      
      this.cache.airlines.next([i]);
    }))
  }

  public EditCompanyData(company : AirlineCompany) : Observable<AirlineCompany>{
    return this.network.EditAirlineCompany(company).pipe(tap(i =>{
      if(i){
        this.cache.airlines.next([i]);
      }
    }))
  }
}
