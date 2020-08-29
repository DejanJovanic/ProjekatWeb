import { CarDiscount } from './CarDiscount.model';
import { CarRating } from './CarRating.model';
import { CarReservation } from './CarReservation.model';

export class Carr{
    id : number;
    brand : string;
    model : string;
    yearOfProduction : number;
    type : string;
    fuelType : string;
    transmissionType : string;
    numberOfSeats : number;
    price : number;
    ratings: Array<CarRating>;
    reservations: Array<CarReservation>;
    discounts: Array<CarDiscount>;

    constructor (){
        this.ratings = new Array<CarRating>();
        this.reservations = new Array<CarReservation>();
        this.discounts = new Array<CarDiscount>();
       
    }
}