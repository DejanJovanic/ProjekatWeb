import { Flight } from '../Flight.model';
import { Airplane } from '../Airplane.model';
import { Ticket } from '../Ticket.model';
import { User } from '../../Common/User.model';
import { AirlineCompany } from '../AirlineCompany.model';
import { FlightDetails } from '../FlightDetails.model';
import { Seats } from '../Seats.model';
import { SeatStatus } from '../SeatStatus.model';

export class FlightDatabase extends Flight{

    airplane : Airplane;
    soldTickets : Ticket[]
    details : FlightDetails;

    constructor(public airline : AirlineCompany){
        super(airline);  
        this.soldTickets = [];
        this.details = new FlightDetails();
        this.details.seats.rowNum = 5;
        this.details.seats.colNum = 10;
        for(let i : number = 0; i < 5; i++){
            this.details.seats.seats.push([]);
            for(let j : number = 0; j < 10;j++){
                this.details.seats.seats[i].push(SeatStatus.Free);
            }
        }
    }
}