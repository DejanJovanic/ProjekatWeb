import { SeatStatus } from './SeatStatus.model';
import { Flight } from './Flight.model';
import { FlightDetails } from './FlightDetails.model';
import { Airplane } from './Airplane.model';

export class Seats{
    rowNum : number;
    colNum : number;
    seats : SeatStatus[][]

    constructor(){
        this.seats = []
    }

    public CreateSeats(flight : Flight){
        for(let i = 0 ; i < this.rowNum;i += 1){
            this.seats.push([]);
            for(let j = 0; j < this.colNum; j += 1){
              this.seats[i].push(SeatStatus.Free);
            }
          }
          if(flight.airplane.removedSeats){
            for(let a of flight.airplane.removedSeats){
              this.seats[a.row][a.column] = SeatStatus.Removed
            }
          }
          if(flight.airplane.disabledSeats){
            for(let a of flight.airplane.disabledSeats){
              this.seats[a.row][a.column] = SeatStatus.Disabled
            }
          }
          if(flight.tickets){
            for(let a of flight.tickets){
              this.seats[a.row][a.column] = SeatStatus.Taken
            }
          }
   /*        if(flight.fastFlights){
            for(let a of flight.fastFlights){
              this.seats[a.row][a.column] = SeatStatus.Fast
            }
          } */
    }

    public CreateSeatsAirplane(airplane : Airplane){
      this.rowNum = airplane.rows;
      this.colNum = airplane.columns;
      for(let i = 0 ; i < airplane.rows;i += 1){
        this.seats.push([]);
        for(let j = 0; j < airplane.columns; j += 1){
          this.seats[i].push(SeatStatus.Free);
        }
      }
      if(airplane.removedSeats){
        for(let a of airplane.removedSeats){
          this.seats[a.row][a.column] = SeatStatus.Removed
        }
      }
      if(airplane.disabledSeats){
        for(let a of airplane.disabledSeats){
          this.seats[a.row][a.column] = SeatStatus.Disabled
        }
      }
      if(airplane.takenSeats){
        for(let a of airplane.takenSeats){
          this.seats[a.row][a.column] = SeatStatus.Taken
        }
      }
        if(airplane.specialSeats){
        for(let a of airplane.specialSeats){
          this.seats[a.row][a.column] = SeatStatus.Fast
        }
      } 
    }
}