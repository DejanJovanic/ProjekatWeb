import { Component, OnInit } from '@angular/core';
import { AirplaneService } from '../Services/Airplane/airplane-service.service';
import { Observable } from 'rxjs';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAirplaneModalComponent } from '../add-airplane-modal/add-airplane-modal.component';
import { AirlineAdminDataService } from '../Services/AirlineAdminData/airline-admin-data.service';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css']
})
export class AirplanesComponent implements OnInit {

  items : Observable<Airplane[]>
  constructor(private service : AirplaneService,private adminService : AirlineAdminDataService, private modal : NgbModal) {
    this.items = service.airplanes;
   }

  ngOnInit(): void {
  }

  AddAirplane(){
    let ref = this.modal.open(AddAirplaneModalComponent,{size : 'lg'})
    ref.componentInstance.CreatedAirplane.subscribe(item =>{
      this.service.SetAirplane(item).subscribe(i => this.adminService.GetAirlineData());
    })
  }

}
