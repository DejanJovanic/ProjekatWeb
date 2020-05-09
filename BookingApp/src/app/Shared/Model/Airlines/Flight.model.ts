import { AirlineCompany } from './AirlineCompany.model';

export class Flight{
    id : number;
    startLocation : string;
    startDate : Date;
    finishLocation : string;
    finishDate : Date;
    travelTime : string;
    travelDistance : number;
    numberOfStops : number;
    stopsLocations : Array<String>;
    price : number;
    isRoundTrip : boolean;
    airline : AirlineCompany

    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
    }
}