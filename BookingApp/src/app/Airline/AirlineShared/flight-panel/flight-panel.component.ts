import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineDetailsModalComponent } from '../airline-details-modal/airline-details-modal.component';



@Component({
  selector: 'app-flight-panel',
  templateUrl: './flight-panel.component.html',
  styleUrls: ['./flight-panel.component.css']
})
export class FlightPanelComponent implements OnInit {

  role : string;
  @Input() flight: Flight;

  constructor(private modalService : NgbModal) {
    this.role = sessionStorage["Role"]
   }

  OpenModal(){
    const modalRef = this.modalService.open(AirlineDetailsModalComponent);
    modalRef.componentInstance.item = this.flight.airline;
  }

  ngOnInit(): void {
  }

}
