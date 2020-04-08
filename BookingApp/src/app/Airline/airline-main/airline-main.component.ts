import { Component, OnInit, EventEmitter } from '@angular/core';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-airline-main',
  templateUrl: './airline-main.component.html',
  styleUrls: ['./airline-main.component.css']
})
export class AirlineMainComponent implements OnInit {

  constructor() { }

  public filterSubject : Subject<FlightFilterParams> = new Subject<FlightFilterParams>();

  ngOnInit(): void {
  }

  onFlightFilter(event : FlightFilterParams){
    this.filterSubject.next(event);
  }
}
