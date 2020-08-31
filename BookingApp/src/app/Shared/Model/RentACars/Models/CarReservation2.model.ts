import { SpecialOffer } from './SpecialOffer.model';

export class CarReservation2{
    id : number;
    
    numberOfDays : number;
    price : number;
    dateFrom : Date;
    dateTo : Date;
    isRated : boolean;
    realizedPackage : SpecialOffer;
    rentedDay: Date;

    constructor (){  
        this.realizedPackage = new SpecialOffer();
    }
}