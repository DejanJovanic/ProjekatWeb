import { Injectable } from '@angular/core';
import { AirlineCacheService } from 'src/app/Airline/AirlineShared/Services/AirlineCache/airline-cache.service';
import { Observable } from 'rxjs';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { map, tap } from 'rxjs/operators';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';

@Injectable({
  providedIn: 'root'
})
export class AirplaneService {

  public airplanes : Observable<Airplane[]>;
  constructor(private cache : AirlineCacheService,private network : AirlineAdminNetworkService) { 
    this.airplanes = cache.airlines.pipe(map(i =>{
      let temp = []
      for(let a of i[0].airplanes){
        temp.push(a);
      }
      return temp
    }));
  }

  public SetAirplane(airplane : Airplane) : Observable<boolean>{
    return this.network.SetAirplane(airplane);
  }
}
