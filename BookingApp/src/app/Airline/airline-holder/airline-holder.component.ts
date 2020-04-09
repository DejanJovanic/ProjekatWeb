import { Component, OnInit, Input } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range, Observable, Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { FlightFilterService } from '../Services/FlightFilter/flight-filter.service';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';


@Component({
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [FlightFilterService]
})
export class AirlineHolderComponent implements OnInit {

  public flights : Array<Flight>;

  private sub : Subscription;

  @Input() public filter : Observable<FlightFilterParams>;

  constructor(private cache : AirlineCacheService,private filterService : FlightFilterService) {}

  ngOnInit(): void {
    this.flights = new Array<Flight>();
    for(let a of this.cache.flights){
      this.flights.push(a);
    }
    this.sub = this.filter.subscribe(i => this.filterItems(i));
  }

  
  filterItems(params : FlightFilterParams){
    this.flights = this.filterService.filter(params);
  }
}
