import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FlightDetailsService } from '../../AirlineShared/Services/FlightDetails/flight-details.service';

@Injectable({
  providedIn: 'root'
})
export class SeatResolveService implements Resolve<any> {

  constructor(private service : FlightDetailsService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this.service.getDetails(route.params.id)
  }
}
