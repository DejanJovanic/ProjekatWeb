import { Component, OnInit } from '@angular/core';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-invites-holder',
  templateUrl: './reservation-invites-holder.component.html',
  styleUrls: ['./reservation-invites-holder.component.css']
})
export class ReservationInvitesHolderComponent implements OnInit {

  public reservations : Observable<FlightReservation[]>
  constructor(private service : UserCacheService) {
    this.reservations = service.reservations.pipe(map(i =>{
      let ret : FlightReservation[] = []
      if(i){
        for(let a of i){
          if(!a.tickets[0].isApproved){
            ret.push(a);
          }
        }
      }
    
      return ret;
    }))
   }

  ngOnInit(): void {
  }

}
