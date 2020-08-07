import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range, Observable, Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { FlightFilterService } from '../Services/FlightFilter/flight-filter.service';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';
import { FlightSearchService } from '../../AirlineRegistered/Services/FlightSearch/flight-search.service';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [FlightSearchService]
})
export class AirlineHolderComponent implements OnInit, OnDestroy {

  public flights : Observable<Flight[]>;

  private sub : Subscription;
  private searchSub : Subscription;

  @Input() public filter : Observable<FlightFilterParams>;

  constructor(private data : AirlineGetterService,private filterService : FlightFilterService,
    private searchService : FlightSearchService) {
      this.flights = this.data.flights;
    }

  ngOnInit(): void {


    this.sub = this.filter.subscribe(i => this.filterService.filter.next(i));
    if(localStorage.flightFilter)
      this.filterService.filter.next(JSON.parse(localStorage.flightFilter))
  }

  ngOnDestroy() : void{
    this.sub.unsubscribe();
    //this.searchSub.unsubscribe();
  }
}
