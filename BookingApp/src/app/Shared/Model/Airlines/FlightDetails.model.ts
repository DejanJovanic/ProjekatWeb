import { Airplane } from './Airplane.model';
import { Seats } from './Seats.model';
import { Extra } from './Extra.model';
import { LoadWeigth } from './LoadWeigth.model';

export class FlightDetails{
    airplane : Airplane;
    seats : Seats;
    extras : Extra[]
    luggageOptions : LoadWeigth[]
    price : number;
    constructor(){
        this.luggageOptions = []
        this.extras = []
        this.seats = new Seats();
    }
}