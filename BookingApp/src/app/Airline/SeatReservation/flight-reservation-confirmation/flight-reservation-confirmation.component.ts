import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { SetBookingServiceService } from 'src/app/Shared/Services/set-booking-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { TicketNetwork } from 'src/app/Shared/Model/Airlines/TicketNetwork.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { switchMap } from 'rxjs/operators';
import { UserNetworkService } from 'src/app/Users/Services/UserNetwork/user-network.service';

@Component({
  selector: 'app-flight-reservation-confirmation',
  templateUrl: './flight-reservation-confirmation.component.html',
  styleUrls: ['./flight-reservation-confirmation.component.css']
})
export class FlightReservationConfirmationComponent implements OnInit, OnDestroy {

  private sub : Subscription
  public tickets : Ticket[]
  public points : number
  constructor(private userNetwork : UserNetworkService,private cache : AirlineCacheService,public route : ActivatedRoute,private router : Router,private service : FlightReservationService,private bookingService : SetBookingServiceService,private userService : UserCacheService) { 
     this.tickets = service.reservation.tickets;
     this.points = userService.currentUser.points;
    let flights = this.cache.airlines.getValue().map(i =>{
      let flights = new Array<Flight>();
        for(let flight of i.flights){
          flights.push(flight);
        }
      return flights;
    })
    let temp = []
    for(let a of flights){
      for(let b of a){
        temp.push(b);
      }
    }
   
    let flight = temp.find(item => item.id == this.route.snapshot.params.id)
    service.reservation.flight = flight
    for(let item of this.tickets){
      item.price = this.service.reservation.flight.price;
    } 

  }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
     
  }

  Cancel(){
    this.router.navigate(['/main/Airlines']);
  }

  SetReservationPoints(){
    this.bookingService.SetFlightReservation(this.service.reservation);
    this.sub = this.bookingService.SendCurrentReservationPoints().pipe(switchMap(_ => this.userNetwork.GetUserDetails())).subscribe(i =>{
      this.service.reservation = null;
      this.router.navigate(['']);
      localStorage.removeItem("choosenFriends")
      localStorage.removeItem("currentReservation")
    })
  }
  SetReservation(){
    this.bookingService.SetFlightReservation(this.service.reservation);
    this.sub = this.bookingService.SendCurrentReservation().pipe(switchMap(_ => this.userNetwork.GetUserDetails())).subscribe(i =>{
      this.service.reservation = null;
      this.router.navigate(['']);
      localStorage.removeItem("choosenFriends")
      localStorage.removeItem("currentReservation")
    })
 
  }

}
