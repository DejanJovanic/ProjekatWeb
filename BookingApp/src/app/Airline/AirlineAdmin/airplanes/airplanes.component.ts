import { Component, OnInit } from '@angular/core';
import { AirplaneService } from '../Services/Airplane/airplane-service.service';
import { Observable } from 'rxjs';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAirplaneModalComponent } from '../add-airplane-modal/add-airplane-modal.component';

@Component({
  selector: 'app-airplanes',
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css']
})
export class AirplanesComponent implements OnInit {

  items : Observable<Airplane[]>
  constructor(private service : AirplaneService, private modal : NgbModal) {
    this.items = service.airplanes;
   }

  ngOnInit(): void {
  }

  AddAirplane(){
    let ref = this.modal.open(AddAirplaneModalComponent)
    ref.componentInstance.CreatedAirplane.subscribe(item =>{
      this.service.SetAirplane(item).subscribe(i =>{});
    })
  }

}
