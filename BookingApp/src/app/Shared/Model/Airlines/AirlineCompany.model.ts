import { Airline } from './Airline.model';
import { Flight } from './Flight.model';

export class AirlineCompany{
    id : number;
    name : string;
    description : string;
    address : string;
    grade : number;
    destinations : Array<string>;
    flights : Array<Flight>;

    constructor (){
        this.destinations = new Array<string>();
        this.flights = new Array<Flight>();
    }
}