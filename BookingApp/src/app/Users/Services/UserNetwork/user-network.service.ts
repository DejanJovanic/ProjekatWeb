import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from '../UserCache/user-cache.service';

@Injectable({
  providedIn: 'root'
})
export class UserNetworkService {

  constructor(private db : UserDatabaseService,private cache : UserCacheService) { }

  public getFriends(username : string) : Observable<User[]>{
      let temp = []
      let user = this.db.users.find(i => i.username == username)
      for(let a of user.friends){
        
        temp.push(of(a));
      }
      return forkJoin<User>(temp);
  }     
  public Login(username : string, password : string) : Observable<boolean>{
    let user = this.db.users.find(i => i.username == username)
    if(user != null){
      return of(true);
    }
    else{
      return of(false);
    }   
  }
  public GetUserDetails(username : string) : Observable<User>{
    let user = this.db.users.find(i => i.username == username)
    if(user != null){
      return of(user);
    }
    else{
      return of(null);
    }  
  }

  public SearchForFriends(params : {username : string, name: string, lastName : string}) : Observable<{username : string, name: string, lastName : string}[]>{
    return of(this.db.users.filter(i =>{
      let count = 0
      let isOk = true;
      if(params.username != undefined && params.username != ''){
        if(i.username.toLowerCase() != params.username.toLowerCase()) isOk = false;
      }
      else count += 1
      if(params.name != undefined && params.name != ''){
        if(i.name.toLowerCase() != params.name.toLowerCase()) isOk = false;
      }
      else count += 1
      if(params.lastName != undefined && params.lastName != ''){
        if(i.lastName.toLowerCase() != params.lastName.toLowerCase()) isOk = false;
      }
      else count += 1
      if(count == 3) return false
      return isOk;
    }))
  }
  public SendFriendRequest(username : string){
    let temp = this.db.users.find(i => i.username == username);
    if(temp != null){
      let list = this.cache.friends.getValue();
      if(list.find(i => i.username == temp.username) == null){
        list.push(temp);
        this.cache.friends.next(list)
      }
     
    }
  }
}
