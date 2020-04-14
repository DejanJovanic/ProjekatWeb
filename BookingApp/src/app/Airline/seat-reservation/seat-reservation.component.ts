import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { FlightDetailsService } from '../Services/FlightDetails/flight-details.service';
import { Subscription } from 'rxjs';
import { SeatDisplay } from 'src/app/Shared/Model/Airlines/SeatDisplay.model';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { FlightReservation } from 'src/app/Shared/Model/Airlines/FlightReservation.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { FlightReservationService } from '../Services/FlightReservation/flight-reservation.service';
import { AirlineCacheService } from '../Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent implements OnInit {

  public reservation : FlightReservation
  public seats : SeatDisplay[]
  private details : FlightDetails
  private obs : Subscription;
  constructor(private route : ActivatedRoute,private service : FlightDetailsService,
    private reservationService : FlightReservationService, private router : Router
    ,private cache : AirlineCacheService) {
    this.reservation = new FlightReservation(this.cache.flights.find(item => item.id == this.route.snapshot.params.id))
   }

  ngOnInit(): void {
    this.obs = this.service.getDetails(this.route.snapshot.params.id).subscribe(i => {
      this.details = i;
      this.seats = this.setDisplay(i);
    });
  }

  public itemClicked(row : number,column : number){
    for(let a of this.seats){
      if(a.row == row && a.column == column){
        if(a.status == SeatStatus.Free){
          a.status = SeatStatus.Selected;
          let temp = new Ticket();
          temp.row = row;
          temp.column = column;
          temp.seatIndex = a.index;
          this.reservation.tickets.push(temp);
        }
        else if(a.status == SeatStatus.Selected){
          a.status = SeatStatus.Free;
          this.reservation.tickets.splice(this.reservation.tickets.findIndex(item => item.seatIndex == a.index),1)
        }
      }
    }
  }

  onButtonClicked(){
    if(this.reservation != null && this.reservation.tickets.length > 0){
      this.reservationService.reservation = this.reservation;
      this.router.navigate(['\seatAssignment']);

    }
  }

  getItemColor(status : SeatStatus) : string{
    switch (status) {
      case SeatStatus.Free:
          return 'white';
      case SeatStatus.Taken:
        return 'red';
      case SeatStatus.Selected:
        return 'green';
      default:
        return 'blue';
    }
  }
  private setDisplay(details : FlightDetails) : SeatDisplay[]{
    let ret = [];  
    for(let i : number = 0; i < details.seats.rowNum; i++){
      for(let j : number = 0; j < details.seats.colNum; j++){
        let temp = new SeatDisplay();
        temp.column = j;
        temp.row = i;
        temp.status = details.seats.seats[i][j];
        temp.color = this.getItemColor(temp.status);
        temp.offsetX = j * 60;
        temp.offsetY = i * 65;
        temp.index = i * details.seats.colNum + j + 1;
        ret.push(temp);
      }
    }

    return ret;
  }

}
