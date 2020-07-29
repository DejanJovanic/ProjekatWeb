import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { Subscription } from 'rxjs';
import { FastFlightService } from '../Services/FastFlight/fast-flight.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-reservations-main',
  templateUrl: './reservations-main.component.html',
  styleUrls: ['./reservations-main.component.css']
})
export class ReservationsMainComponent implements OnInit,OnDestroy {

  private sub : Subscription
  constructor(private service : ReservationService,private fastFlightService : FastFlightService) { }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.service.getReservations().pipe(mergeMap(_ => this.fastFlightService.GetFastFlightReservations())).subscribe(i => {})
  }

}
