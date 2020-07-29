import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AirlineDetailsModalComponent } from '../../AirlineShared/airline-details-modal/airline-details-modal.component';
import { FastFlightService } from '../Services/FastFlight/fast-flight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fast-reservations-panel',
  templateUrl: './fast-reservations-panel.component.html',
  styleUrls: ['./fast-reservations-panel.component.css']
})
export class FastReservationsPanelComponent implements OnInit,OnDestroy {

  @Input()
  fastFlight : FastFlight
  price : number
  subNetwork : Subscription
  constructor(public service : FastFlightService,public user : UserCacheService,private modalService : NgbModal,private router : Router) { }
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
    modalRef.componentInstance.item = this.fastFlight.airline;
  }

  public Cancel(){

    this.subNetwork = this.service.CancelFastFlightReservation(this.fastFlight.airline.id,this.fastFlight.id).subscribe(i =>{
      this.router.navigate(['/main/Airlines'])
    })
  }
  public Rate(){
    
  }
}
