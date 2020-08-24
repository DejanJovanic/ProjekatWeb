import { Component, OnInit, Input } from '@angular/core';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-acar-delete-somodal',
  templateUrl: './rent-acar-delete-somodal.component.html',
  styleUrls: ['./rent-acar-delete-somodal.component.css']
})
export class RentACarDeleteSOModalComponent implements OnInit {

  @Input()
  item : SpecialOffer;
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }
  deleteSpecialOffer(soId: number){

  }
}
