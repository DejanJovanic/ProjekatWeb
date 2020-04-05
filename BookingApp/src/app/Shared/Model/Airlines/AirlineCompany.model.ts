import { Airline } from './Airline.model';

export class AirlineCompany{
    name : string;
    description : string;
    address : string;
    grade : number;
    airlines : Array<Airline>;

    constructor (){
        this.airlines = new Array<Airline>();
    }
}