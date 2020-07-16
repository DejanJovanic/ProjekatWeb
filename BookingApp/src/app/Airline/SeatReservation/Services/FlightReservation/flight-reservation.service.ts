import { Injectable } from '@angular/core';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';

@Injectable({
  providedIn: 'root'
})
export class FlightReservationService {

  public reservation : FlightReservation
  constructor() { }
}
