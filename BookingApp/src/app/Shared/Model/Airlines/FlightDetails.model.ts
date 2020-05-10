import { Airplane } from './Airplane.model';
import { Seats } from './Seats.model';

export class FlightDetails{
    airplane : Airplane;
    seats : Seats;

    constructor(){
        this.seats = new Seats();
    }
}