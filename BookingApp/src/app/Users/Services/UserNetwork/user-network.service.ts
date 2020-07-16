import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from '../UserCache/user-cache.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/Shared/Model/Common/IUser.model';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class UserNetworkService {

  constructor(private db : UserDatabaseService,private cache : UserCacheService,private client : HttpClient) { }

  public getFriends(username : string) : Observable<User[]>{
    return this.client.get<User[]>('http://localhost:50000/api/Friends')
  }     
/*   public Login(username : string, password : string) : Observable<boolean>{
    let user = this.db.users.find(i => i.username == username)
    if(user != null){
      return of(true);
    }
    else{
      return of(false);
    }   
  } */
  public Login(username : string, password : string) : Observable<string>{
    return this.client.post<{token:string}>('http://localhost:50000/api/Login',{username : username, password : password}).pipe(
      map(i => i.token) 
    )  
  }
/*   public GetUserDetails(username : string) : Observable<User>{
    let user = this.db.users.find(i => i.username == username)
    if(user != null){
      return of(user);
    }
    else{
      return of(null);
    }  
  } */
  public GetUserDetails() : Observable<User>{
    return this.client.get<{user : any}>('http://localhost:50000/api/GeneralUser').pipe(
      map( i =>{
        switch(sessionStorage["Role"]){
          case  "User":
            let user = new User();
            user = i.user as User;
            return user;
          case "AirlineAdmin":
            let admin = new AirlineAdmin()
            admin = i.user as AirlineAdmin;
            return admin;
          default:
            return null
        }
      }

      )
      )
  }

  public SearchForFriends(params : {username : string, name: string, lastName : string}) : Observable<{username : string, name: string, lastName : string}[]>{
   return this.client.get<{username : string, name: string, lastName : string}[]>('http://localhost:50000/api/User')
  }
  public SendFriendRequest(username : string){
    this.client.post<User>('http://localhost:50000/api/FriendRequest',   
    {
        params :  new HttpParams().set('friendUsername',username)
    })
  }
}
