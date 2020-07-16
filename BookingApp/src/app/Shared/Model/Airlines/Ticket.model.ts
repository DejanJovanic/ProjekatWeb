import { UserFlightDetails } from '../Common/UserFlightDetails.model';
import { Extra } from './Extra.model';

export class Ticket{
    row : number;
    column : number;
    seatIndex : number;
    price : number;
    luggageWeigth : number;
    extras : Extra[]
    details : UserFlightDetails

    constructor(){
        this.extras = [];
    }
}