import { Injectable } from '@angular/core';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Observable } from 'rxjs';
import { AirlineNetworkService } from '../AirlineNetwork/airline-network.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightDetailsService {

  public details : FlightDetails
  constructor(private service : AirlineNetworkService) { }

  public getDetails(id : number) : Observable<FlightDetails>{
    return this.service.getDetails(id).pipe(tap(i => this.details = i));
  }
}
