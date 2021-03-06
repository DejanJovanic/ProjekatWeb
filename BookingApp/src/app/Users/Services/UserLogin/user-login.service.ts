import { Injectable } from '@angular/core';
import { UserNetworkService } from '../UserNetwork/user-network.service';
import { Observable, of } from 'rxjs';
import { UserCacheService } from '../UserCache/user-cache.service';
import { switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/Shared/Model/Common/User.model';
import * as jwtDecode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  username : string
  constructor(private cache : UserCacheService,private network : UserNetworkService)  {}
  
  public Login(username : string, password : string) : Observable<User>{
    return this.network.Login(username,password).pipe(
      tap(i =>{
        if(i){
          localStorage["token"] = i;
          let decoded = jwtDecode(i);
          localStorage["Role"] = decoded['role'];          
        }}),
      switchMap(i => i != "" ? this.network.GetUserDetails() :of(null)),     
      tap(i =>{
        if(i != null){
          this.cache.currentUser = i;
        }
      })
    );
    
  }

  public ChangePassword(username,oldPassword,newPassword) : Observable<boolean>{
    return this.network.ChangePassword(username,oldPassword,newPassword);
  }

}
