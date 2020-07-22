import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservations-main',
  templateUrl: './reservations-main.component.html',
  styleUrls: ['./reservations-main.component.css']
})
export class ReservationsMainComponent implements OnInit,OnDestroy {

  private sub : Subscription
  constructor(private service : ReservationService) { }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.service.getReservations().subscribe(i => {})
  }

}
