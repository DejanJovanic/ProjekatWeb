import { AirlineCompany } from './AirlineCompany.model';

export class Flight{
    id : number;
    startLocation : string;
    startDate : Date;
    finishLocation : string;
    finishDate : Date;
    travelTime : number;
    travelDistance : number;
    numberOfStops : number;
    stopsLocations : Array<String>;
    price : number;
    airline : AirlineCompany

    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
    }
}