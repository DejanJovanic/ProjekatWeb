import { Injectable } from '@angular/core';
import { AirlineDatabaseService } from 'src/app/Shared/Model/Airlines/Database/airline-database.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { Observable, of } from 'rxjs';
import { UserDatabaseService } from 'src/app/Shared/Model/Common/Database/user-database.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminNetworkService {

  constructor(private db : AirlineDatabaseService,private users : UserDatabaseService) { }

  public GetAirlineData(username : string) : Observable<AirlineCompany>{
    let temp = this.users.users.find(i => i.username == username)
    if(temp)
      return of(this.db.companies.find(i => i.id == (temp as AirlineAdmin).airlineID));
  }
}
