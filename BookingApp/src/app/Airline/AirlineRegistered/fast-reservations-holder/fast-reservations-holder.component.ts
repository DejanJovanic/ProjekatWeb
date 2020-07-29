import { Component, OnInit } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { Observable } from 'rxjs';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';

@Component({
  selector: 'app-fast-reservations-holder',
  templateUrl: './fast-reservations-holder.component.html',
  styleUrls: ['./fast-reservations-holder.component.css']
})
export class FastReservationsHolderComponent implements OnInit {

  public fastFlights : Observable<FastFlight[]>
  constructor(private cache : UserCacheService) {
    this.fastFlights = this.cache.fastFlightReservations.asObservable();
   }

  ngOnInit(): void {
  }

}
