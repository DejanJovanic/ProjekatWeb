import { Injectable } from '@angular/core';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserNetworkService } from '../UserNetwork/user-network.service';
import { tap } from 'rxjs/operators';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';


@Injectable({
  providedIn: 'root'
})
export class UserCacheService {

  public currentUser : User
  public friends : BehaviorSubject<User[]>
  public reservations : BehaviorSubject<FlightReservation[]>
  constructor() {
    this.friends = new BehaviorSubject(null);
    this.reservations = new BehaviorSubject(null);
   }

 /*   public GetFriends() : Observable<User[]>{
     if(this.friends.getValue() != null){
       return this.friends.asObservable();
     }
     else{
       return this.network.getFriends(this.currentUser.username).pipe(tap(item =>{
         this.friends.next(item);
       }));
     }

   } */

}
