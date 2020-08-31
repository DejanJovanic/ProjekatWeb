import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-reservations-holder',
  templateUrl: './reservations-holder.component.html',
  styleUrls: ['./reservations-holder.component.css']
})
export class ReservationsHolderComponent implements OnInit {

  public reservations : Observable<FlightReservation[]>
  constructor(private service : UserCacheService) {
    this.reservations = service.reservations.pipe(map(i =>{
      let ret : FlightReservation[] = []
      if(i){
        for(let a of i){
          if(a.tickets[0].isApproved){
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
