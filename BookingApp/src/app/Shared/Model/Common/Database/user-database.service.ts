import { Injectable } from '@angular/core';
import { User } from '../User.model';
import { AirlineAdmin } from '../AirlineAdmin.model';
import { RentACarAdmin } from '../../RentACars/RentACarAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class UserDatabaseService {

 public users : User[]
  constructor() { 
    this.users = []
    for(let i = 0; i < 5; i++){
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
    for(let i = 0; i < 5; i++){
      let temp = new AirlineAdmin();
      temp.username = "airlineAdmin" + i;
      temp.name = "name" + i;
      temp.lastName = "lastName" + i;
      temp.passportNo = "" + i;
      temp.systemRole = "AirlineAdmin";
      temp.airlineID = i;
      this.users.push(temp);

    }
    for(let i = 0; i < 6; i++){
      let temp = new RentACarAdmin();
      temp.username = "rentACarAdmin" + i;
      temp.name = "name" + i;
      temp.lastName = "lastName" + i;
      temp.passportNo = "" + i;
      temp.systemRole = "RentACarAdmin";
      temp.RentACarEnterpriseId = i;
      this.users.push(temp);
      
    }
  }
}
