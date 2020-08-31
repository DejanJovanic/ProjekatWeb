import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from '../Services/Reservation/reservation.service';
import { Subscription } from 'rxjs';
import { FastFlightService } from '../Services/FastFlight/fast-flight.service';
import { mergeMap } from 'rxjs/operators';
import { EnterpriseService } from 'src/app/RentACar/Services/EnterpriseService/enterprise.service';

@Component({
  selector: 'app-reservations-main',
  templateUrl: './reservations-main.component.html',
  styleUrls: ['./reservations-main.component.css']
})
export class ReservationsMainComponent implements OnInit,OnDestroy {

  username : string;
  ret;
  slides: any = [[]];
  private sub : Subscription
  constructor(private enterpriseService : EnterpriseService, private service : ReservationService,private fastFlightService : FastFlightService) { }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.username= localStorage["username"];
    this.sub = this.service.getReservations().pipe(mergeMap(_ => this.fastFlightService.GetFastFlightReservations())).subscribe(i => {})

    /*this.enterpriseService.getCarReservations(this.username).subscribe(i => {
      this.ret = i;
      this.slides = this.chunk(this.ret.UserCarReservation, 3);
      console.log(this.ret.UserCarReservation);
    })*/
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  

}
