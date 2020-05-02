import { Injectable } from '@angular/core';
import { User } from '../User.model';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

 public users : User[]
  constructor() { 
    this.users = []
    for(let i = 0; i < 10; i++){
      let temp = new User();
      temp.username = "user" + i;
      temp.name = "name" + i;
      temp.lastName = "lastName" + i;
      temp.passportNo = "" + i;
      temp.systemRole = "User";
      this.users.push(temp);
      if(i > 0){
        temp.friends.push(this.users[i - 1]);
      }
    }
  }
}
