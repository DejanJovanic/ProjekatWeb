import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { FriendChooseModalComponent } from '../friend-choose-modal/friend-choose-modal.component';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';

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

  @Input()
  public currentUserSelected : {isSelected : boolean};
  @Output()
  public dataAdded : EventEmitter<UserFlightDetailsModal>

  @Output()
  public dataCleared : EventEmitter<number>;
  constructor(private modalService : NgbModal,private cache : UserCacheService) {
    this.dataAdded = new EventEmitter();
    this.dataCleared = new EventEmitter();
   }

  ngOnInit(): void {
  }

  ChooseMe(){
    if(this.cache.currentUser != null){
      this.currentUserSelected.isSelected = true;
      this.ticket.details = new UserFlightDetails();
      this.ticket.details.name = this.cache.currentUser.name;
      this.ticket.details.lastName = this.cache.currentUser.lastName;
      this.ticket.details.passportNum = this.cache.currentUser.passportNo;
      this.ticket.details.username = this.cache.currentUser.username;
    }
  }
  ClearData(){

    if(this.ticket.details.username != undefined){
      if(sessionStorage["choosenFriends"] != null){
        let temp = JSON.parse(sessionStorage["choosenFriends"]);
        let index = temp.indexOf(this.ticket.details.username)
        if(index != -1){
          temp.splice(index,1)
          sessionStorage["choosenFriends"] = JSON.stringify(temp);
      }      
      else{
        this.currentUserSelected.isSelected = false
      }

      }
      else{
        this.currentUserSelected.isSelected = false
      }

    }
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
  
  ChooseFriend(){
    const modalRef = this.modalService.open(FriendChooseModalComponent);
    modalRef.componentInstance.returnValue.subscribe(item =>{
      let temp = new UserFlightDetails();
      temp.name = item.name;
      temp.lastName = item.lastName;
      temp.passportNum = item.passportNum;
      this.ticket.details = temp;
      this.ticket.details.username = item.username;
      this.dataAdded.emit(item);
    })

  }

}
