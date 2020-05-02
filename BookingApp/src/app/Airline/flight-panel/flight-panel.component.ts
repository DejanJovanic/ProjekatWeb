import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineDetailsComponent } from '../airline-details/airline-details.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-flight-panel',
  templateUrl: './flight-panel.component.html',
  styleUrls: ['./flight-panel.component.css']
})
export class FlightPanelComponent implements OnInit {

  role : string;
  @Input() flight: Flight;

  constructor(private modalService : NgbModal,private cookies : CookieService) {
    this.role = sessionStorage["Role"];
   }

  OpenModal(){
    this.cookies.set('aaa','aaaa');
    const modalRef = this.modalService.open(AirlineDetailsComponent);
    modalRef.componentInstance.item = this.flight.airline;
  }

  ngOnInit(): void {
  }

}
