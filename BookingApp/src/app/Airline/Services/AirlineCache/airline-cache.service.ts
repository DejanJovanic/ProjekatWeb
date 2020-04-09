import { Injectable } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { Airline } from 'src/app/Shared/Model/Airlines/Airline.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineCacheService {

  public airlines : Array<AirlineCompany>;
  public flights : Array<Flight>;
  constructor() { 
    this.airlines = new Array<AirlineCompany>();
    this.flights = new Array<Flight>();
    for(let i = 0; i < 10; i++ ){
      let company = new AirlineCompany();
      company.name = "Company-" + i;
      company.description = "Great company-" + i;
      company.address = "address-" + i;
      company.grade = i;
      let flight = new Flight(company);
      flight.price = i + 100;
      flight.startDate = new Date();
      flight.finishDate = new Date();
      flight.finishDate.setMonth((flight.finishDate.getMonth() + i) % 12);
      company.flights.push(flight);
      this.flights.push(flight);
      let airline1 = new Airline();
      airline1.startName = "aaa" + i;
      airline1.destinationName = "bbb" + i;
      airline1.businessClassPrice = 3;
      airline1.middleClassPrice = 2;
      airline1.economyClassPrice = 1;
      let airline2 = new Airline();
      airline2.startName = "ccc" + i;
      airline2.destinationName = "ddd" + i;
      airline2.businessClassPrice = 3;
      airline2.middleClassPrice = 2;
      airline2.economyClassPrice = 1;
      company.airlines.push(airline1);
      company.airlines.push(airline2);
      this.airlines.push(company);
    }
  }
}
