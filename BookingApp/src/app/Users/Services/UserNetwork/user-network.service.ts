import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { User } from 'src/app/Shared/Model/Common/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserNetworkService {

  constructor(private db : UserDatabaseService) { }

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
}
