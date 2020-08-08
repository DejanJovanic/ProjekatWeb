import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range, Observable, Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { FlightFilterService } from '../Services/FlightFilter/flight-filter.service';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';
import { FlightSearchService } from '../../AirlineRegistered/Services/FlightSearch/flight-search.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortParameter } from 'src/app/Shared/Model/Airlines/SortParameter.model';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [FlightSearchService]
})
export class AirlineHolderComponent implements OnInit, OnDestroy {

  public flights : Observable<Flight[]>;
  form : FormGroup
  private sub : Subscription;
  private searchSub : Subscription;

  @Input() public filter : Observable<FlightFilterParams>;

  constructor(private data : AirlineGetterService,private filterService : FlightFilterService,
    private searchService : FlightSearchService,private builder : FormBuilder) {
      this.flights = this.data.flights;
    }

  ngOnInit(): void {
    this.form = this.builder.group({
      sort : ['AirlineAZ']
    })
    this.data.sort.next(SortParameter.AirlineAZ);
    this.form.get('sort').valueChanges.subscribe(i =>{
      switch(i){
        case "AirlineAZ":
          this.data.sort.next(SortParameter.AirlineAZ);
          break;
        case "AirlineZA":
          this.data.sort.next(SortParameter.AirlineZA);
          break;
        case "PriceAsc":
          this.data.sort.next(SortParameter.PriceAscending);
          break;
        case "PriceDesc":
          this.data.sort.next(SortParameter.PriceDescending);
          break;

      }
    })

    this.sub = this.filter.subscribe(i => this.filterService.filter.next(i));
    if(localStorage.flightFilter)
      this.filterService.filter.next(JSON.parse(localStorage.flightFilter))
  }

  ngOnDestroy() : void{
    this.sub.unsubscribe();
    this.data.sort.next(null);

    //this.searchSub.unsubscribe();
  }
}
