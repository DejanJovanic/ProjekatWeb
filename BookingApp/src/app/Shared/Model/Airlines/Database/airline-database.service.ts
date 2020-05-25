import { Injectable } from '@angular/core';
import { AirlineCompanyDatabase } from './AirlineCompanyDatabase.model';
import { FlightDatabase } from './FlightDatabase.model';
import { AirlineAddress } from '../AirlineAddress.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineDatabaseService {

  public companies : AirlineCompanyDatabase[];
  constructor() { 
    this.companies = [];
    for(let i = 0; i < 10; i++ ){
      let company = new AirlineCompanyDatabase();
      company.id = i;
      company.name = "Company-" + i;
      company.description = "Great company-" + i;
      company.address = new AirlineAddress();
      company.address.city = "city" + i
      company.address.country = "country" + i
      company.address.street = "street" + i
      company.address.streetNo = i.toString();
      company.address.zipCode = "" + i + (i+1) + (i+2)
      company.grade = i;
      let flight = new FlightDatabase(company);
      flight.id = i;
      flight.price = i + 100;
      flight.startDate = new Date();
      flight.endDate = new Date();
      flight.endDate.setMonth((flight.endDate.getMonth() + i) % 12);
      company.flightsDatabases.push(flight);
      company.flights.push(flight);
      company.destinations.push("Beograd")
      company.destinations.push("Pariz")
      company.destinations.push("London")
      this.companies.push(company);
    }
  }
}
