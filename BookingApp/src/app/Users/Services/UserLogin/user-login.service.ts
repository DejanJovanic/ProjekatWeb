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

  constructor(private cache : UserCacheService,private network : UserNetworkService)  {}
  
  public Login(username : string, password : string) : Observable<User>{
  /*  return new Observable(observer =>{
      this.network.Login(username,password).subscribe(i =>{
        if(i == true){
          this.network.GetUserDetails(username).subscribe(j =>{
            if(j != null){
              this.cache.currentUser = j;
              sessionStorage["Role"] = j.systemRole;
              observer.next(j)
              observer.complete()
            }
            else{
              observer.error("User with given username does not exist")
              observer.complete();
            }  
            
          })
        }
        else{
          observer.error("Username and passoword combination is invalid");
          observer.complete();
        }
      })
    });  */
    return this.network.Login(username,password).pipe(
      tap(i =>{
        if(i){
          localStorage["token"] = i;
          let decoded = jwtDecode(i);
          sessionStorage["Role"] = decoded['role'];          
        }}),
      switchMap(i => i != "" ? this.network.GetUserDetails() :of(null)),     
      tap(i =>{
        if(i != null){
          this.cache.currentUser = i;
        }
      })
    );
    
  }


}
