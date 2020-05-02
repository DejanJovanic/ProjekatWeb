import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { FriendChooseModalComponent } from '../friend-choose-modal/friend-choose-modal.component';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.css']
})
export class TicketPreviewComponent implements OnInit {

  username : string
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
    if(this.username != ""){
      let temp = JSON.parse(sessionStorage["choosenFriends"]);
      let index = temp.indexOf(this.username)
      if(index != -1){
        temp.splice(index,1)
        sessionStorage["choosenFriends"] = JSON.stringify(temp);
        this.username = "";
      }

    }
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
  
  ChooseFriend(){
    const modalRef = this.modalService.open(FriendChooseModalComponent);
    modalRef.componentInstance.returnValue.subscribe(item =>{
      let temp = new UserFlightDetails();
      temp.name = item.name;
      temp.lastName = item.lastName;
      temp.passportNum = item.passportNum;
      this.ticket.details = temp;
      this.username = item.username;
      this.dataAdded.emit(item);
    })

  }

}
