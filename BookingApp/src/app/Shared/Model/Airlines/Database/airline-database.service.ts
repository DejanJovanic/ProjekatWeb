import { Injectable } from '@angular/core';
import { AirlineCompanyDatabase } from './AirlineCompanyDatabase.model';
import { FlightDatabase } from './FlightDatabase.model';

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
      company.address = "address-" + i;
      company.grade = i;
      let flight = new FlightDatabase(company);
      flight.id = i;
      flight.price = i + 100;
      flight.startDate = new Date();
      flight.finishDate = new Date();
      flight.finishDate.setMonth((flight.finishDate.getMonth() + i) % 12);
      company.flightsDatabases.push(flight);
      company.flights.push(flight);
      company.destinations.push("Beograd")
      company.destinations.push("Pariz")
      company.destinations.push("London")
      this.companies.push(company);
    }
  }
}
