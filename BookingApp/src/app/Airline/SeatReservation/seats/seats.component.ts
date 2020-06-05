import { Component, OnInit, Input } from '@angular/core';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { SeatDisplay } from 'src/app/Shared/Model/Airlines/SeatDisplay.model';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {

  @Input() selectedSeats : Ticket[];
  @Input() state : SeatDisplayState;
  @Input() seatsInput: Seats;
  SeatStatus = SeatStatus;
  seats : SeatDisplay[];

  public seatClicked : any;
  public seatColor : any;
  constructor() { }

  ngOnInit(): void {
    this.seats = this.setDisplay(this.seatsInput)
    switch(this.state){
      case SeatDisplayState.Reservation:
        this.seatClicked = this.itemClickedReservation;
        break;
      case SeatDisplayState.Preview:
        this.seatClicked = (a,b) => {};
        break;
      case SeatDisplayState.FastSelector:
        this.seatClicked = this.itemClickedFast;
        break;
      case SeatDisplayState.Removal:
        this.seatClicked = this.itemClickedReservation;
        break;
    }
    this.seatColor = this.getItemColor
  }
  
  public itemClickedReservation(row : number,column : number){
    for(let a of this.seats){
      if(a.row == row && a.column == column){
        if(a.status == SeatStatus.Free){
          a.status = SeatStatus.Selected;
          let temp = new Ticket();
          temp.row = row;
          temp.column = column;
          temp.seatIndex = a.index;
          this.selectedSeats.push(temp);
        }
        else if(a.status == SeatStatus.Selected){
          a.status = SeatStatus.Free;
          this.selectedSeats.splice(this.selectedSeats.findIndex(item => item.seatIndex == a.index),1)
        }
        break;
      }
    }
  }

  public itemClickedFast(row : number,column : number){
    for(let a of this.seats){
      if(a.row == row && a.column == column){
        if(a.status == SeatStatus.Free){
          a.status = SeatStatus.Fast;
          let temp = new Ticket();
          temp.row = row;
          temp.column = column;
          temp.seatIndex = a.index;
          this.selectedSeats.push(temp);
        }
        else if(a.status == SeatStatus.Fast){
          a.status = SeatStatus.Free;
          this.selectedSeats.splice(this.selectedSeats.findIndex(item => item.seatIndex == a.index),1)
        }
        break;
      }
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
      case SeatStatus.Fast:
        return 'blue';
      case SeatStatus.Disabled:
        return 'purple';
    }
  }
  private setDisplay(seats : Seats) : SeatDisplay[]{
    let ret = [];  
    for(let i : number = 0; i < seats.rowNum; i++){
      for(let j : number = 0; j < seats.colNum; j++){
        let temp = new SeatDisplay();
        temp.column = j;
        temp.row = i;
        temp.status = seats.seats[i][j];
        temp.color = this.getItemColor(temp.status);
        temp.offsetX = j * 60;
        temp.offsetY = i * 65;
        temp.index = i * seats.colNum + j + 1;
        ret.push(temp);
        if(this.state == SeatDisplayState.FastSelector && temp.status == SeatStatus.Fast){
          let temp2 = new Ticket();
          temp2.row = temp.row;
          temp2.column = temp.column;
          temp2.seatIndex = temp.index;
          this.selectedSeats.push(temp2);
        }
      }
    }

    return ret;
  }

}
