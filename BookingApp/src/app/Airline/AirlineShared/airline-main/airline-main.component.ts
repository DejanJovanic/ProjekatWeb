import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { Subject, Subscription } from 'rxjs';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { FlightSearchService } from '../../AirlineRegistered/Services/FlightSearch/flight-search.service';




@Component({
  selector: 'app-airline-main',
  templateUrl: './airline-main.component.html',
  styleUrls: ['./airline-main.component.css']
})
export class AirlineMainComponent implements OnInit, OnDestroy {

  constructor(private searchService: FlightSearchService) { }
  searchSub : Subscription
  public filterSubject : Subject<FlightFilterParams> = new Subject<FlightFilterParams>();

  ngOnDestroy(): void {
    if(this.searchSub)
      this.searchSub.unsubscribe();
  }
  ngOnInit(): void {
  }
  onFlightSearch(event : FlightSearchParams){
    if(this.searchSub)
      this.searchSub.unsubscribe();
    sessionStorage.flightSearch = JSON.stringify(event);
    this.searchSub = this.searchService.getResults(event).subscribe(i => {});
  }
  onFlightFilter(event : FlightFilterParams){
    sessionStorage.flightFilter = JSON.stringify(event);
    this.filterSubject.next(event);
  }
}
