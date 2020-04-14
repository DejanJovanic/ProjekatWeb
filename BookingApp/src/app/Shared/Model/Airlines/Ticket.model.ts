import { UserFlightDetails } from '../Common/UserFlightDetails.model';

export class Ticket{
    row : number;
    column : number;
    seatIndex : number;
    price : number;
    details : UserFlightDetails

    constructor(){
    }
}