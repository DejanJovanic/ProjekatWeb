import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';

@Component({
  selector: 'app-seat-assignment',
  templateUrl: './seat-assignment.component.html',
  styleUrls: ['./seat-assignment.component.css']
})
export class SeatAssignmentComponent implements OnInit {

  public isOk : boolean;
  public reservation : FlightReservation;
  public tickets : Ticket[]
  public currentUserSelected : {isSelected : boolean}
  constructor(private service : FlightReservationService,private cache : UserCacheService,private router : Router,public route : ActivatedRoute) {
    let meIn = false;
    if(sessionStorage["choosenFriends"] != null){
      let temp = JSON.parse(sessionStorage["choosenFriends"]);
      let friendCount = 0;
      
      for(let a of this.service.reservation.tickets){
        if(a.details != null && a.details.username != null){
          if(temp.find(i => i == a.details.username) != null){
            friendCount = friendCount + 1;
          }
          else if(a.details.username == this.cache.currentUser.username){
            meIn = true;
          }
        }
      }
      if(friendCount != temp.length){
        sessionStorage.removeItem("choosenFriends");
      }

      
    }
    if(meIn){
      this.currentUserSelected = {isSelected : true};
    }
    else{
      this.currentUserSelected = {isSelected : false};
    }
   }

  ngOnInit(): void {
    this.reservation = this.service.reservation;
    this.tickets = this.reservation.tickets;
  }
  public IsOk(){
    for(let a of this.reservation.tickets){
      if(a.details == null){
        return false;
      }
    }
    return true;
  }

  OnClick(){
    this.service.reservation.flight = null
    sessionStorage["currentReservation"] = JSON.stringify(this.service.reservation);
    this.router.navigate(['/flightReservationConfirm',this.route.snapshot.params.id]);

  }

}
