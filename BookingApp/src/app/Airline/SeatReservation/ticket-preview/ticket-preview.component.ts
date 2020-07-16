import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { FriendChooseModalComponent } from '../friend-choose-modal/friend-choose-modal.component';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { EnterPassportComponent } from '../enter-passport/enter-passport.component';
import { FlightDetailsService } from '../../AirlineShared/Services/FlightDetails/flight-details.service';
import { SetDetailsComponent } from '../set-details/set-details.component';

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
  @Input()
  public discountPercentage : number;
  @Output()
  public dataAdded : EventEmitter<UserFlightDetailsModal>

  public maxWeigth : number;
  @Output()
  public dataCleared : EventEmitter<number>;
  constructor(private modalService : NgbModal,private cache : UserCacheService,private flightDetails : FlightDetailsService) {
    this.dataAdded = new EventEmitter();
    this.dataCleared = new EventEmitter();
   }

  ngOnInit(): void {
    if(this.flightDetails.details.luggageOptions.length > 0){
      this.maxWeigth = this.flightDetails.details.luggageOptions[0].to
      this.flightDetails.details.luggageOptions.forEach(element => {
        if(element.to > this.maxWeigth ) this.maxWeigth  = element.to
      });
    }
    
  }

  ChooseMe(){
    if(this.cache.currentUser != null){
      var ref = this.modalService.open(EnterPassportComponent);
      ref.componentInstance.returnValue.subscribe(passport =>{
        this.currentUserSelected.isSelected = true;
        this.ticket.details = new UserFlightDetails();
        this.ticket.details.name = this.cache.currentUser.name;
        this.ticket.details.lastName = this.cache.currentUser.lastName;
        this.ticket.details.passportNum = passport;
        this.ticket.details.username = this.cache.currentUser.username;
      })
 
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
  SetDetails(){
    const modalRef = this.modalService.open(SetDetailsComponent);
    modalRef.componentInstance.maxWeigth = this.maxWeigth
    modalRef.componentInstance.returnValue.subscribe(i =>{
      this.ticket.price = this.flightDetails.details.price;
      for(let a of this.flightDetails.details.luggageOptions){
        if(a.from >= i.luggageWeigth && a.to < i.luggageWeigth){
          this.ticket.price += i.luggageWeigth * a.price;
          break;
        }
      }
      for(let a of i.selectedExtras){
        this.ticket.price += a.price;
      }
      this.CalculatePrice();
    })
  }

  CalculatePrice(){
    this.ticket.price -= (this.ticket.price / 100) * this.discountPercentage; 
  }
}
