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

@Component({
  selector: 'app-flight-reservation-confirmation',
  templateUrl: './flight-reservation-confirmation.component.html',
  styleUrls: ['./flight-reservation-confirmation.component.css']
})
export class FlightReservationConfirmationComponent implements OnInit, OnDestroy {

  private sub : Subscription
  public tickets : Ticket[]
  public discountPercentage : number;
  constructor(private cache : AirlineCacheService,public route : ActivatedRoute,private router : Router,private service : FlightReservationService,private bookingService : SetBookingServiceService,private user : UserCacheService) { 
     this.tickets = service.reservation.tickets;
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
    this.discountPercentage = 0
    if(sessionStorage.choosenFriends){
        let friends = JSON.parse(sessionStorage.choosenFriends);
        this.discountPercentage = Math.floor(flight.distance/300) * friends.length
    }
  }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
     
  }

  SetReservation(){
    this.bookingService.SetFlightReservation(this.service.reservation);
    this.sub = this.bookingService.SendCurrentReservation().subscribe(i =>{
      this.service.reservation = null;
      this.router.navigate(['']);
      sessionStorage.removeItem("choosenFriends")
      sessionStorage.removeItem("currentReservation")
    })
 
  }

}
