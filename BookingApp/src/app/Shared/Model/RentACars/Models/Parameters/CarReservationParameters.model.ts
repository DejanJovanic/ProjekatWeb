import { Car } from '../Car.model'
import { SpecialOffer } from '../SpecialOffer.model';
import { Enterprise } from '../Enterprise.model';

export class CarReservationParameters{
   
    carId : number;
    enterpriseId : number;
    dateFrom : Date;
    dateTo : Date;
    rentedDay: Date;

    constructor (){  }
 
}