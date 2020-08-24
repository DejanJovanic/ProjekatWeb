import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-acar-delete-car-modal',
  templateUrl: './rent-acar-delete-car-modal.component.html',
  styleUrls: ['./rent-acar-delete-car-modal.component.css']
})
export class RentACarDeleteCarModalComponent implements OnInit {
  @Input()
  item : Car;
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteCar(carId: number){
    
  }

}
