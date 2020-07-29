import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AddressPipe } from '../Pipes/Address/address.pipe';

@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit {

  @Input()
  item : AirlineCompany
  @Output()
  redirectionHappening : EventEmitter<any>
  constructor() {
  this.redirectionHappening = new EventEmitter()
  }

  ngOnInit(): void {
  }

  public Redirection(){
    this.redirectionHappening.emit(null);
  }

}
