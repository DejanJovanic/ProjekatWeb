import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { Subject, Subscription } from 'rxjs';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { FlightSearchService } from '../../AirlineRegistered/Services/FlightSearch/flight-search.service';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortParameter } from 'src/app/Shared/Model/Airlines/SortParameter.model';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';




@Component({
  selector: 'app-airline-main',
  templateUrl: './airline-main.component.html',
  styleUrls: ['./airline-main.component.css']
})
export class AirlineMainComponent implements OnInit, OnDestroy {

  constructor(private searchService: FlightSearchService,private getter : AirlineGetterService,private background : BackgroundService) { }
  searchSub : Subscription

  sub : Subscription
  public filterSubject : Subject<FlightFilterParams> = new Subject<FlightFilterParams>();

  ngOnDestroy(): void {
    if(this.searchSub)
      this.searchSub.unsubscribe();
    if(this.sub)
      this.sub.unsubscribe();
      

    this.filterSubject.next(null);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.AirlineMain);
  });
  }
  onFlightSearch(event : FlightSearchParams){
    if(this.searchSub)
      this.searchSub.unsubscribe();
    localStorage.flightSearch = JSON.stringify(event);
    this.searchSub = this.searchService.getResults(event).subscribe(i => {});
  }
  onFlightFilter(event : FlightFilterParams){
    localStorage.flightFilter = JSON.stringify(event);
    this.filterSubject.next(event);
  }
}
