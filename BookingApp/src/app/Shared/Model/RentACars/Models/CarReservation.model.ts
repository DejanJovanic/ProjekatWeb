import { Car } from './Car.model'
import { SpecialOffer } from './SpecialOffer.model';
import { Enterprise } from './Enterprise.model';

export class CarReservation{
    id : number;
    selectedCar : Car;
    selectedEnterprise : Enterprise;
    numberOfDays : number;
    price : number;
    dateFrom : Date;
    dateTo : Date;
    isRated : boolean;
    realizedPackage : SpecialOffer;

    constructor (){  }
 
}