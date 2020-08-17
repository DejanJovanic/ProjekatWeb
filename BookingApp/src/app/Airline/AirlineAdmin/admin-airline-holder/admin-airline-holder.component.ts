import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineAdminDataService } from '../Services/AirlineAdminData/airline-admin-data.service';

@Component({
  selector: 'app-admin-airline-holder',
  templateUrl: './admin-airline-holder.component.html',
  styleUrls: ['./admin-airline-holder.component.css']
})
export class AdminAirlineHolderComponent implements OnInit {

  flights : Observable<Flight[]>
  constructor(private service : AirlineAdminDataService) {
    this.flights = this.service.data.asObservable()
  }

  ngOnInit(): void {
  }

}
