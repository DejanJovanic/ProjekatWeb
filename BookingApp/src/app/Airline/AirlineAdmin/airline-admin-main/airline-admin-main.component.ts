import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';
import { AirlineAdminDataService } from '../Services/AirlineAdminServices/AirlineAdminData/airline-admin-data.service';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { AirlineAdmin } from 'src/app/Shared/Model/Common/AirlineAdmin.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddFlightComponent } from '../add-flight/add-flight.component';

@Component({
  selector: 'app-airline-admin-main',
  templateUrl: './airline-admin-main.component.html',
  styleUrls: ['./airline-admin-main.component.css']
})
export class AirlineAdminMainComponent implements OnInit {

  constructor(private service : AirlineAdminDataService,private cache : UserCacheService) { }
  public filterSubject : Subject<FlightFilterParams> = new Subject<FlightFilterParams>();
  ngOnInit(): void {
    if(sessionStorage["Role"] == "AirlineAdmin"){
      if(sessionStorage["username"]){
        this.service.GetAirlineData(sessionStorage["username"])
      }
    }
  }
  onFlightFilter(event : FlightFilterParams){
    sessionStorage.flightFilter = JSON.stringify(event);
    this.filterSubject.next(event);
  }


}
