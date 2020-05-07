import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminDataService {

  constructor(private cache : AirlineCacheService,private network : AirlineAdminNetworkService) { }

  public GetAirlineData(username : string){
    this.network.GetAirlineData(username).subscribe(i =>{
      this.cache.airlines.next([i]);
    })
  }
}
