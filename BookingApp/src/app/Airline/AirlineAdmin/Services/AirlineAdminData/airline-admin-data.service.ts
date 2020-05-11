import { Injectable } from '@angular/core';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

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

  public EditCompanyData(company : AirlineCompany){
    this.network.EditAirlineCompany(company).subscribe(i =>{
      if(i){
        this.cache.airlines.next([i]);
      }
    })
  }
}
