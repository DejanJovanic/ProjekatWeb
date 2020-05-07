import { Injectable } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AirlineCacheService {

  public airlines : BehaviorSubject<AirlineCompany[]>;
  constructor() { 
    this.airlines = new BehaviorSubject<AirlineCompany[]>(null);
  }
}
