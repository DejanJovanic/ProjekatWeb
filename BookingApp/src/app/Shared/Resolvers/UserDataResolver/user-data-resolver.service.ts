import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { UserNetworkService } from 'src/app/Users/Services/UserNetwork/user-network.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataResolverService implements Resolve<any> {

  constructor(private cacheService : UserCacheService, private networkService : UserNetworkService,private router : Router) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
      return this.networkService.GetUserDetails().pipe(tap(i =>{
        this.cacheService.currentUser = i;
      }))
  }
}
