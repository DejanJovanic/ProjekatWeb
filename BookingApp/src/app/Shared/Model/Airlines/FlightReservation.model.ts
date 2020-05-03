import { Ticket } from './Ticket.model';
import { Flight } from './Flight.model';

export class FlightReservation {
    public flight : Flight;
    public tickets : Ticket[]

    constructor(){
        this.tickets = [];
    }
}