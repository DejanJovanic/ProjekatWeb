import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

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
  public flightId : number;
  constructor(private service : FlightReservationService,private cache : UserCacheService,private router : Router,public route : ActivatedRoute,private background : BackgroundService) {
    let meIn = false;
    if(localStorage["choosenFriends"] != null){
      let temp = JSON.parse(localStorage["choosenFriends"]);
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
        localStorage.removeItem("choosenFriends");
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
    setTimeout(() => {
      this.background.SetBackgroud(Background.SeatReservation);
  });
    this.flightId = this.route.snapshot.params.id;
    this.reservation = this.service.reservation;
    this.tickets = this.reservation.tickets;
  }
  public IsOk(){
    let meIn = false;
    for(let a of this.reservation.tickets){
      if(a.details == null){
        return false;
      }
      else{
        if(a.details.username && a.details.username.toLowerCase() == this.cache.currentUser.username.toLowerCase()) meIn = true;
      }
    }
    return meIn;
  }

  OnClick(){
    this.service.reservation.flight = null
    localStorage["currentReservation"] = JSON.stringify(this.service.reservation);
    this.router.navigate(['/flightReservationConfirm',this.route.snapshot.params.id]);

  }

}
