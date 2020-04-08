import { Component, OnInit, Input } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range, Observable, Subscription } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';


@Component({
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [AirlineGetterService]
})
export class AirlineHolderComponent implements OnInit {

  companies : Array<AirlineCompany>;
  public flights : Array<Flight>;
  public displayedFlights : Array<Flight>;
  private sub : Subscription;

   @Input() public filter : Observable<FlightFilterParams>;

  constructor(private service: AirlineGetterService) {}

  ngOnInit(): void {
    this.companies = this.service.GetAirlineCompanies();
    this.flights = new Array<Flight>();
    this.companies.forEach(element => {
      element.flights.forEach(a => this.flights.push(a));
    });
    this.displayedFlights = this.flights;
    this.sub = this.filter.subscribe(i => this.filterItems(i));
  }

  filterFunction(item : Flight, params : FlightFilterParams){
    if(!isNaN(params.price) && params.price != null){
      return item.price == params.price;
    }
    else{
      return true;
    }
  }
  filterItems(params : FlightFilterParams){
    this.displayedFlights = this.flights.filter( item => this.filterFunction(item,params));
  }
}
