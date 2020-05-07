import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

  @Input()
  item : AirlineCompany
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

}
