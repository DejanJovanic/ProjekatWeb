import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineDetailsModalComponent } from '../../AirlineShared/airline-details-modal/airline-details-modal.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { AirlineNetworkService } from '../../AirlineShared/Services/AirlineNetwork/airline-network.service';
import { ReservationConfirmation } from 'src/app/Shared/Model/Airlines/ReservationConfirmation.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reservations-panel',
  templateUrl: './reservations-panel.component.html',
  styleUrls: ['./reservations-panel.component.css']
})
export class ReservationsPanelComponent implements OnInit,OnDestroy {

  @Input()
  public reservation : FlightReservation
  subNetwork : Subscription
  constructor(private network : AirlineNetworkService,private modalService : NgbModal,private router : Router) { }
  ngOnDestroy(): void {
    if(this.subNetwork) this.subNetwork.unsubscribe();
  }

  ngOnInit(): void {
  }

  public checkIfTimeOk(reservationDate : Date){
    var temp = new Date(reservationDate.valueOf())
    temp.setHours(temp.getHours() - 3)
    return new Date().getTime() < temp.getTime();
  }

  public ShowCompanyInfo(){
    const modalRef = this.modalService.open(AirlineDetailsModalComponent);
    modalRef.componentInstance.item = this.reservation.flight.airline;
  }

  public Manage(ticket : Ticket){
    this.router.navigate(['/ManageInvitation', this.reservation.flight.airline.id, this.reservation.flight.id,ticket.id]);
  }
  public Cancel(ticket : Ticket){
    let temp = new ReservationConfirmation()
    temp.airlineId = this.reservation.flight.airline.id;
    temp.flightId = this.reservation.flight.id;
    temp.ticketId = ticket.id;
    this.subNetwork = this.network.cancelReservation(temp).subscribe(i =>{
      this.router.navigate(['/main/Airlines'])
    })
  }
  public Rate(ticket : Ticket){
    
  }

}
