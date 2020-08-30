import { Discount } from './Discount.model';
import { CarRating } from './CarRating.model';
import { CarReservation } from './CarReservation.model';

export class Car{
    id : number;
    enterpriseId: number;
    brand : string;
    model : string;
    yearOfProduction : number;
    type : string;
    fuelType : string;
    transmissionType : string;
    numberOfSeats : number;
    price : number;
    ratings: CarRating[] = [];
    reservations: CarReservation[] = [];
    discounts: Discount[] = [];

    constructor(){}
   
}