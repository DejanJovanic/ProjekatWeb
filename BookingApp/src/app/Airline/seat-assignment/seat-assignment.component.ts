import { Component, OnInit } from '@angular/core';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightUserDetailsComponent } from '../flight-user-details/flight-user-details.component';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';

@Component({
  selector: 'app-seat-assignment',
  templateUrl: './seat-assignment.component.html',
  styleUrls: ['./seat-assignment.component.css']
})
export class SeatAssignmentComponent implements OnInit {

  public isOk : boolean;
  public reservation : FlightReservation;
  public tickets : Ticket[]

  constructor(private service : FlightReservationService,private modalService : NgbModal) {
    this.reservation = new FlightReservation();
    this.tickets = []
   }

  ngOnInit(): void {
    this.reservation = this.service.reservation;
    this.tickets = this.reservation.tickets;
  }
  ClearData(index : number){
    for(let a of this.reservation.tickets){
      if(a.seatIndex == index){
        a.details = null;
        this.isOk = false;
      }
    }
  }
  EnterData(index : number){
    const modalRef = this.modalService.open(FlightUserDetailsComponent);
    modalRef.componentInstance.index = index;
    modalRef.componentInstance.returnValue.subscribe(item =>{
      let temp = new UserFlightDetails();
      temp.name = item.name;
      temp.lastName = item.lastName;
      temp.passportNum = item.passportNum;
      for(let a of this.reservation.tickets){
        if(a.seatIndex == item.index){
          a.details = temp;
        }
      }
      let ok = true;
      for(let a of this.reservation.tickets){
        if(a.details == null){
          ok = false;
          break;
        }
      }
      if(ok){
        this.isOk = true;
      }
    })
  }
}
