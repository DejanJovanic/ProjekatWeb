import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from '../UserCache/user-cache.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IUser } from 'src/app/Shared/Model/Common/IUser.model';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class UserNetworkService {

  constructor(private db : UserDatabaseService,private cache : UserCacheService,private client : HttpClient) { }

  public getFriends() : Observable<User[]>{
    return this.client.get<User[]>('http://localhost:50000/api/Friends').pipe(tap(i =>{
      if(i) this.cache.friends.next(i);
    }))
  }     

  public Login(username : string, password : string) : Observable<string>{
    return this.client.post<{token:string}>('http://localhost:50000/api/Login',{username : username, password : password}).pipe(
      map(i => i.token) 
    )  
  }

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
    let param = new HttpParams()
    if(params.username) param = param.append('username',params.username)
    if(params.name) param = param.append('name',params.name)
    if(params.lastName) param = param.append('lastName',params.lastName)
    if(param.keys().length > 0)
      return this.client.get<{username : string, name: string, lastName : string}[]>('http://localhost:50000/api/User',  { params :  param}) 
    else
      return of(null)
  }
  public SendFriendRequest(username : string){
    return this.client.post<User>('http://localhost:50000/api/FriendRequest',null,   
    {
        params :  new HttpParams().set('friendUsername',username)
    })
  }

    public AcceptFriendRequest(username : string){
      return this.client.put<User>('http://localhost:50000/api/FriendRequest',null,   
    {
        params :  new HttpParams().set('friendUsername',username)
    })
  }

  public DeclineFriendRequest(username : string){
    return this.client.delete<User>('http://localhost:50000/api/FriendRequest',   
    {
        params :  new HttpParams().set('friendUsername',username)
    })
  }
  public GetPendingFriendRequest(){
    return this.client.get<User[]>('http://localhost:50000/api/FriendRequest').pipe(tap(i =>{
      if(i) this.cache.pendingRequests.next(i);
    }))
  }
}
