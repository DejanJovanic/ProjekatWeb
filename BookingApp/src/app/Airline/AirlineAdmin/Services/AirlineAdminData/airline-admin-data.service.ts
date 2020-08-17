import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminDataService {

  data : BehaviorSubject<Flight[]>
  constructor(private cache : AirlineCacheService,private network : AirlineAdminNetworkService) {
    this.data = new BehaviorSubject(null);
   }

  public GetAirlineData(){
    this.network.GetAirlineData().subscribe(i =>{
      if(i){
        let flights = new Array<Flight>();
        for(let a of i.flights){
          if(a)
            flights.push(a);
          
        }
        this.data.next(flights);
      }
      else this.data.next(null);
      
      this.cache.airlines.next([i]);
    })
  }

  public EditCompanyData(company : AirlineCompany){
    this.network.EditAirlineCompany(company).subscribe(i =>{
      if(i){
        this.cache.airlines.next([i]);
      }
    })
  }
}
