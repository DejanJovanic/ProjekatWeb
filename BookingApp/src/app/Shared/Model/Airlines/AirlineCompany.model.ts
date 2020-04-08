import { Airline } from './Airline.model';
import { Flight } from './Flight.model';

export class AirlineCompany{
    name : string;
    description : string;
    address : string;
    grade : number;
    airlines : Array<Airline>;
    flights : Array<Flight>;

    constructor (){
        this.airlines = new Array<Airline>();
        this.flights = new Array<Flight>();
    }
}