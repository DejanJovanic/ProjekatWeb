import { Ticket } from './Ticket.model';

export class FlightReservation {
    public tickets : Ticket[]

    constructor(){
        this.tickets = [];
    }
}