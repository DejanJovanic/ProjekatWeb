import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserCacheService } from '../UserCache/user-cache.service';
import { UserNetworkService } from '../UserNetwork/user-network.service';
import { tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriensResolverService implements Resolve<any> {

  constructor(private cacheService : UserCacheService, private networkService : UserNetworkService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
   if(this.cacheService.currentUser == null){
     return this.networkService.GetUserDetails().pipe(switchMap(a =>{
      if(this.cacheService.friends.getValue() == null){
        return this.networkService.getFriends(this.cacheService.currentUser.username).pipe(tap(item =>{
          this.cacheService.friends.next(item);
        }))
      }
      else{
        return of(this.cacheService.friends.getValue());
      }
     }))
   }
   else{
    if(this.cacheService.friends.getValue() == null){
      return this.networkService.getFriends(this.cacheService.currentUser.username).pipe(tap(item =>{
        this.cacheService.friends.next(item);
      }))
    }
    else{
      return of(this.cacheService.friends.getValue());
    }
   }

  }
}
