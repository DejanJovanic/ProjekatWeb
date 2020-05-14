import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';

@Component({
  selector: 'app-rent-acar-details-modal',
  templateUrl: './rent-acar-details-modal.component.html',
  styleUrls: ['./rent-acar-details-modal.component.css']
})
export class RentACarDetailsModalComponent implements OnInit {
  
  @Input()
  item : Car
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

}
