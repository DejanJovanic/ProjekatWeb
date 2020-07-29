import { Injectable } from '@angular/core';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserNetworkService } from '../UserNetwork/user-network.service';
import { tap } from 'rxjs/operators';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';


@Injectable({
  providedIn: 'root'
})
export class UserCacheService {

  public currentUser : User
  public friends : BehaviorSubject<User[]>
  public pendingRequests : BehaviorSubject<User[]>
  public reservations : BehaviorSubject<FlightReservation[]>
  public fastFlightReservations : BehaviorSubject<FastFlight[]>
  constructor() {
    this.fastFlightReservations = new BehaviorSubject(null);
    this.friends = new BehaviorSubject(null);
    this.reservations = new BehaviorSubject(null);
    this.pendingRequests = new BehaviorSubject(null);
   }
}
