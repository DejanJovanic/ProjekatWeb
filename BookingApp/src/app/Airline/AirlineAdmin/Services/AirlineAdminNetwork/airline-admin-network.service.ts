import { Injectable } from '@angular/core';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, of } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminNetworkService {

  constructor(private userData : UserCacheService,private cache : AirlineCacheService,private db : AirlineDatabaseService,private users : UserDatabaseService) { }

  public GetAirlineData(username : string) : Observable<AirlineCompany>{
    let temp = this.users.users.find(i => i.username == username)
    if(temp)
      return of(this.db.companies.find(i => i.id == (temp as AirlineAdmin).airlineID));
  }

  public SetFlight(flight : Flight) : Observable<boolean>{
    return new Observable<boolean>(subscriber =>{
      let temp = (this.userData.currentUser as AirlineAdmin).airlineID;
      let airline = this.db.companies.find(i => i.id == temp)
      if(airline){
       let id = Math.max.apply(Math, airline.flights.map(a => a.id))
       flight.id = id + 1
       airline.flights.push(flight)
       subscriber.next(true);
       subscriber.complete();
       this.cache.airlines.next([airline]);
      }
      else{
        subscriber.next(false);
        subscriber.complete();
      }
    }) 
  }
  public SetAirplane(airplane : Airplane) : Observable<boolean>{
    return new Observable<boolean>(subscriber =>{
      let temp = (this.userData.currentUser as AirlineAdmin).airlineID;
      let airline = this.db.companies.find(i => i.id == temp)
      if(airline){
        let id : number;
        if(airline.airplanes.length > 0){
          id = Math.max.apply(Math, airline.airplanes.map(a => a.id))
        }
        else{
          id = 0
        }
        airplane.id = id + 1
        airline.airplanes.push(airplane)
        subscriber.next(true);
        subscriber.complete();
        this.cache.airlines.next([airline]);
      }
      else{
        subscriber.next(false);
        subscriber.complete();
      }
    })
  }
}
