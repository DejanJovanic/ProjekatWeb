import { Injectable } from '@angular/core';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, from, forkJoin, of } from 'rxjs';
import { filter, map, merge, concat } from 'rxjs/operators';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineNetworkService {

  constructor(private db : AirlineDatabaseService) { }

  getFlights(params : FlightSearchParams) : Observable<AirlineCompany[]>{
    let array = []
    for(let a of this.db.companies){
      let temp = new AirlineCompany();
      temp.address = a.address;
      temp.description= a.description
      temp.grade = a.grade;
      temp.name = a.name;
      temp.id = a.id;
      temp.flights = []
      for(let b of a.flightsDatabases){
        temp.flights.push(b);
      }
      array.push(a)
    }
    let arrayTemp = []
    for(let a of array){
      arrayTemp.push(of(a));
    }
    return forkJoin<AirlineCompany>(arrayTemp);
  }
  
  getDetails(id : number) : Observable<FlightDetails>{
    for(let a of this.db.companies){
      for(let b of a.flightsDatabases){
        if(b.id == id){
          return  of(b.details);
        }
        
      }
    }
  }
}
