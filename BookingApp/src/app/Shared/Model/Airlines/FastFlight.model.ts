import { Flight } from './Flight.model';
import { User } from '../Common/User.model';
import { AirlineCompany } from './AirlineCompany.model';
import { Extra } from './Extra.model';

export class FastFlight {
    id : number;
    airline : AirlineCompany;
    flight : Flight;
    discountPercentage : number;
    loadWeight : number;
    user : User;
    row : number;
    column : number;
    bookingDate : Date;
    isRated : boolean;
    paidExtras : Extra[]
    price : number
}