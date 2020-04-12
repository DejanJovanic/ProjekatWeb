import { Injectable } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';


@Injectable({
  providedIn: 'root'
})
export class AirlineCacheService {

  public airlines : Array<AirlineCompany>;
  public flights : Array<Flight>;
  constructor() { 
    this.airlines = new Array<AirlineCompany>();
    this.flights = new Array<Flight>();
  
  }
}
