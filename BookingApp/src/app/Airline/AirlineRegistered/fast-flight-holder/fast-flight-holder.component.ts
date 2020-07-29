import { Component, OnInit } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { Observable } from 'rxjs';
import { FastFlightService } from '../Services/FastFlight/fast-flight.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fast-flight-holder',
  templateUrl: './fast-flight-holder.component.html',
  styleUrls: ['./fast-flight-holder.component.css']
})
export class FastFlightHolderComponent implements OnInit {

  airlineId : number
  public flights : Observable<FastFlight[]>
  constructor(private service : FastFlightService,private route : ActivatedRoute) {
    this.flights = service.fastFlights.asObservable();
    this.airlineId = +this.route.snapshot.params.airlineId
    this.service.airlineId = this.airlineId;
    this.service.GetFastFlights(this.airlineId)
   }

  ngOnInit(): void {
  }
}
