import { AirlineCompany } from './AirlineCompany.model';

export class Flight{
    startLocation : string;
    startDate : Date;
    finishLocation : string;
    finishDate : Date;
    travelTime : Number;
    travelDistance : Number;
    numberOfStops : Number;
    stopsLocations : Array<String>;
    price : Number;
    airline : AirlineCompany

    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
    }
}