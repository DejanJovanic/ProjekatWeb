import { UserFlightDetails } from '../Common/UserFlightDetails.model';

export class Ticket{
    row : number;
    column : number;
    seatIndex : number;
    details : UserFlightDetails

    constructor(){
        this.details = new UserFlightDetails();
    }
}