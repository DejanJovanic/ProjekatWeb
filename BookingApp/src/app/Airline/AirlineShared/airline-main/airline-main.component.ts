import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { Subject, Subscription } from 'rxjs';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { FlightSearchService } from '../../AirlineRegistered/Services/FlightSearch/flight-search.service';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortParameter } from 'src/app/Shared/Model/Airlines/SortParameter.model';




@Component({
  selector: 'app-airline-main',
  templateUrl: './airline-main.component.html',
  styleUrls: ['./airline-main.component.css']
})
export class AirlineMainComponent implements OnInit, OnDestroy {

  constructor(private searchService: FlightSearchService,private getter : AirlineGetterService,private builder : FormBuilder) { }
  searchSub : Subscription
  form : FormGroup
  sub : Subscription
  public filterSubject : Subject<FlightFilterParams> = new Subject<FlightFilterParams>();

  ngOnDestroy(): void {
    if(this.searchSub)
      this.searchSub.unsubscribe();
    if(this.sub)
      this.sub.unsubscribe();
      
    this.getter.sort.next(null);

    this.filterSubject.next(null);
  }
  ngOnInit(): void {
    this.form = this.builder.group({
      sort : ['AirlineAZ']
    })
    this.getter.sort.next(SortParameter.AirlineAZ);
    this.form.get('sort').valueChanges.subscribe(i =>{
      switch(i){
        case "AirlineAZ":
          this.getter.sort.next(SortParameter.AirlineAZ);
          break;
        case "AirlineZA":
          this.getter.sort.next(SortParameter.AirlineZA);
          break;
        case "PriceAsc":
          this.getter.sort.next(SortParameter.PriceAscending);
          break;
        case "PriceDesc":
          this.getter.sort.next(SortParameter.PriceDescending);
          break;

      }
    })
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
