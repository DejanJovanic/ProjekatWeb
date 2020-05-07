import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { FlightReservationService } from '../../SeatReservation/Services/FlightReservation/flight-reservation.service';
import { Observable, empty, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationResolverService implements Resolve<any> {

  constructor(private router : Router,private reservation : FlightReservationService) { }

  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    if(this.reservation.reservation != null){
      return empty();
    }
    else{
      if(sessionStorage["currentReservation"] != null){
        this.reservation.reservation = JSON.parse(sessionStorage["currentReservation"])
        return empty();
      }
      else{
        this.router.navigate(['/main'])
        return throwError('Something went wrong!');
      }
    }
  }
}
