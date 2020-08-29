import { Carr } from './Carr.model';
import { SpecialOffer } from './SpecialOffer.model';
import { Enterprise } from './Enterprise.model';

export class CarReservation{
    id : number;
    selectedCar : Carr;
    selectedEnterprise : Enterprise;
    numberOfDays : number;
    price : number;
    dateFrom : Date;
    dateTo : Date;
    isRated : boolean;
    realizedPackage : SpecialOffer;

    constructor (){  }
 
}