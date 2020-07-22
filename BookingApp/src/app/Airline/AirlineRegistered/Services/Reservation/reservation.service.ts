import { Injectable } from '@angular/core';
import { AirlineNetworkService } from 'src/app/Airline/AirlineShared/Services/AirlineNetwork/airline-network.service';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Observable } from 'rxjs';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { tap, map } from 'rxjs/operators';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { Airline } from 'src/app/Shared/Model/Airlines/Airline.model';
import { TicketNetwork } from 'src/app/Shared/Model/Airlines/TicketNetwork.model';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private network : AirlineNetworkService,private cache : UserCacheService) { }

  getReservations() : Observable<FlightReservation[]>{
    return this.network.getReservations().pipe(
      map(items =>{
        let reservations : FlightReservation[] = []
        for(let  a of items){
          let reservation = new FlightReservation()
          
          a.flight.airline = a.airline;
          reservation.flight = a.flight
          let tickets = []
          for(let item of a.tickets){
            let temp = new Ticket();
            temp.row = item.row;
            temp.column = item.column;
            temp.id = item.id;
            
            if(item.loadWeight)
              temp.luggageWeigth = item.loadWeight;
            else
              temp.luggageWeigth = 0;
            
            temp.isApproved = item.isApproved
            temp.isRated = item.isRated;
            temp.details = new UserFlightDetails()
            temp.details.name = item.name;
            temp.details.lastName = item.lastName;
            temp.price = item.price
            tickets.push(temp);
          }
          reservation.tickets = tickets;
          reservations.push(reservation);
        }
        return reservations;
      }),
      tap(i =>{
      this.cache.reservations.next(i);
    }))
  }
}
