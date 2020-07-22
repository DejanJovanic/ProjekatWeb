import { UserFlightDetails } from '../Common/UserFlightDetails.model';
import { Extra } from './Extra.model';

export class Ticket{
    id : number;
    row : number;
    column : number;
    seatIndex : number;
    price : number;
    luggageWeigth : number;
    extras : Extra[]
    details : UserFlightDetails
    isRated : boolean;
    isApproved : boolean;

    constructor(){
        this.extras = [];
    }
}