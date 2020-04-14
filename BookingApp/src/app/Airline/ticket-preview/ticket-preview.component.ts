import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.css']
})
export class TicketPreviewComponent implements OnInit {

  @Input()
  public ticket : Ticket;

  @Input()
  public isAssignment : boolean;
  @Output()
  public dataAdded : EventEmitter<UserFlightDetailsModal>

  @Output()
  public dataCleared : EventEmitter<number>;
  constructor(private modalService : NgbModal) {
    this.dataAdded = new EventEmitter();
    this.dataCleared = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ClearData(){
    this.ticket.details = null;
    this.dataCleared.emit(this.ticket.seatIndex);
  }
  EnterData(){
    const modalRef = this.modalService.open(FlightUserDetailsComponent);
    modalRef.componentInstance.index = this.ticket.seatIndex;
    modalRef.componentInstance.returnValue.subscribe(item =>{
      let temp = new UserFlightDetails();
      temp.name = item.name;
      temp.lastName = item.lastName;
      temp.passportNum = item.passportNum;
      this.ticket.details = temp;
      this.dataAdded.emit(item);
    })
  }

}
