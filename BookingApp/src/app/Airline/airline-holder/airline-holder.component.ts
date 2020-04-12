import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range, Observable, Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { FlightFilterService } from '../Services/FlightFilter/flight-filter.service';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';
import { FlightSearchService } from '../Services/FlightSearch/flight-search.service';


@Component({
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [FlightFilterService,FlightSearchService]
})
export class AirlineHolderComponent implements OnInit, OnDestroy {

  public flights : Array<Flight>;

  private sub : Subscription;
  private searchSub : Subscription;

  @Input() public filter : Observable<FlightFilterParams>;

  constructor(private cache : AirlineCacheService,private filterService : FlightFilterService,
    private searchService : FlightSearchService) {}

  ngOnInit(): void {
    this.searchSub = this.searchService.getResults(null).subscribe(i => this.flights = i);

    this.sub = this.filter.subscribe(i => this.filterItems(i));
  }

  filterItems(params : FlightFilterParams){
    this.flights = this.filterService.filter(params);
  }

  ngOnDestroy() : void{
    this.sub.unsubscribe();
    this.searchSub.unsubscribe();
  }
}
