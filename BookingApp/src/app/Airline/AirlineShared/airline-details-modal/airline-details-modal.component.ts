import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Component({
  selector: 'app-airline-details-modal',
  templateUrl: './airline-details-modal.component.html',
  styleUrls: ['./airline-details-modal.component.css']
})
export class AirlineDetailsModalComponent implements OnInit {

  @Input()
  item : AirlineCompany
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  RedirectionHandler($event){
    this.activeModal.close();
  }

}
