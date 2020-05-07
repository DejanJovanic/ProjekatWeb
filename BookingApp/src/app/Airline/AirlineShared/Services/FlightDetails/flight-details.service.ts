import { Injectable } from '@angular/core';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Observable } from 'rxjs';
import { AirlineNetworkService } from '../AirlineNetwork/airline-network.service';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {

  constructor(private service : AirlineNetworkService) { }

  public getDetails(id : number) : Observable<FlightDetails>{
    return this.service.getDetails(id);
  }
}
