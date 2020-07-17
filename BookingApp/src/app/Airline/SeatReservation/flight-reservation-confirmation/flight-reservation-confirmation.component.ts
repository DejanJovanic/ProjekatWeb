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
    let reservations = []
    for(let item of this.service.reservation.tickets){
      let temp = new TicketNetwork();
      temp.Row = item.row;
      temp.Column = item.column;
      temp.AirlineId = this.service.reservation.flight.airline.id;
      temp.FlightId = this.service.reservation.flight.id;
      temp.TicketOwnerUsername = item.details.username;
      temp.SelectedExtras = []
      for(let a of item.extras){
        temp.SelectedExtras.push(a.id);
      }
      
      if(item.luggageWeigth)
        temp.LoadWeight = item.luggageWeigth;
      else
        temp.LoadWeight = 0;
      if(item.details.username != this.user.currentUser.username)
        temp.InvitedByUsername = this.user.currentUser.username;
      else
        temp.InvitedByUsername = "";
      temp.Name = item.details.name;
      temp.LastName = item.details.lastName;
      temp.Passport = item.details.passportNum;
      reservations.push(temp);
    }
    this.bookingService.SetFlightReservation(reservations);
    this.sub = this.bookingService.SendCurrentReservation().subscribe(i =>{
      this.service.reservation = null;
      this.router.navigate(['']);
      sessionStorage.removeItem("choosenFriends")
      sessionStorage.removeItem("currentReservation")
    })
 
  }

}
