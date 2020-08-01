import { Injectable } from '@angular/core';
import { UserNetworkService } from '../UserNetwork/user-network.service';
import { switchMap, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserCacheService } from '../UserCache/user-cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor(private network : UserNetworkService,private cache : UserCacheService) { }

  public EditUserDetails(details : {name : string,lastName : string,phoneNumber : string,city : string}) : Observable<any>{
    return this.network.EditUserDetails(details).pipe(switchMap(_ => this.network.GetUserDetails()),tap(i => this.cache.currentUser = i))
  }

  public EditAirlineAdminDetails(details : {name : string,lastName : string,phoneNumber : string,city : string}) : Observable<any>{
    return this.network.EditAirlineAdminDetails(details).pipe(switchMap(_ => this.network.GetUserDetails()),tap(i => this.cache.currentUser = i))
  }
}
