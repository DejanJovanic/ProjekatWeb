import { Flight } from '../Flight.model';
import { FlightClass } from '../FlightClass.model';
import { Airplane } from '../Airplane.model';
import { Ticket } from '../Ticket.model';
import { User } from '../../Common/User.model';
import { AirlineCompany } from '../AirlineCompany.model';

export class FlightDatabase extends Flight{
    flightClass : FlightClass;
    airplane : Airplane;
    reservedTickets : Array<Ticket>
    user : User

    constructor(public airline : AirlineCompany){
        super(airline);    
        this.reservedTickets = new Array<Ticket>();
    }
}