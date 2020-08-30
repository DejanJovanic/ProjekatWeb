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

  public ChangePassword(username,oldPassword,newPassword) : Observable<boolean>{
    return this.client.put<boolean>('http://localhost:50000/api/Login/ChangePassword',{username : username, password : oldPassword, newPassword : newPassword})
  }
  public DeletFriend(username) : Observable<User>{
    let param = new HttpParams()
    param = param.append('friendUsername',username)

    return this.client.delete<User>('http://localhost:50000/api/Friends',{ params :  param})
}
  public ResetPassword(token,password,username) : Observable<boolean>{
      let param = new HttpParams()
     param = param.append('username',username)
    param = param.append('token',token)
    param.append('password',password)
    return this.client.put<boolean>('http://localhost:50000/api/VerifyAccount/ResetPassword',{ params :  param})
  }
  public ValidateUser(token,username) : Observable<boolean>{
    let param = new HttpParams()
    param = param.append('username',username)
    param = param.append('token',token)
    return this.client.put<boolean>('http://localhost:50000/api/VerifyAccount/ChangePassword',{ params :  param})
  }

  public Login(username : string, password : string) : Observable<string>{
    return this.client.post<{token:string}>('http://localhost:50000/api/Login',{username : username, password : password}).pipe(
      map(i => i.token) 
    )  
  }

  public EditUserDetails(details : {name : string,lastName : string,phoneNumber : string,city : string}) : Observable<any>{
    return this.client.put<any>('http://localhost:50000/api/User',details);
  }

  public EditAirlineAdminDetails(details : {name : string,lastName : string,phoneNumber : string,city : string}) : Observable<any>{
    return this.client.put<any>('http://localhost:50000/api/AirlineAdmin',details);
  }

  public GetUserDetails() : Observable<User>{
    return this.client.get<{user : any}>('http://localhost:50000/api/GeneralUser').pipe(
      map( i =>{
        switch(localStorage["Role"]){
          case  "User":
            let user = new User();
            user.name = i.user.name;
            user.lastName = i.user.lastName;
            user.phoneNumber = i.user.phoneNumber;
            user.city = i.user.city;
            user.email = i.user.email
            user.username = i.user.username;
            user.systemRole = "User";
            user.points = i.user.points;
            return user;
          case "AirlineAdmin":
            let admin = new AirlineAdmin()
            admin.name = i.user.name;
            admin.lastName = i.user.lastName;
            admin.phoneNumber = i.user.phoneNumber;
            admin.city = i.user.city;
            admin.email = i.user.email
            admin.username = i.user.username;
            admin.systemRole = "AirlineAdmin";
            admin.airlineID = i.user.airlineID;
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
