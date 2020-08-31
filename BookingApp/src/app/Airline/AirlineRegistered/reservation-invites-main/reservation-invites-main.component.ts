import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationService } from '../Services/Reservation/reservation.service';



@Component({
  selector: 'app-reservation-invites-main',
  templateUrl: './reservation-invites-main.component.html',
  styleUrls: ['./reservation-invites-main.component.css']
})
export class ReservationInvitesMainComponent implements OnInit {

  private sub : Subscription
  constructor(private service : ReservationService) { }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.service.getReservations().subscribe(i => {})
  }

}
