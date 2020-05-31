import { AirlineCompany } from './AirlineCompany.model';
import { FlightClass } from './FlightClass.model';
import { Airplane } from './Airplane.model';

export class Flight{
    id : number;
    airplane : Airplane;
    startLocation : string;
    startDate : Date;
    endLocation : string;
    endDate : Date;
    startDateBack : Date;
    endDateBack : Date;
    travelTime : string;
    travelDistance : number;
    numberOfStops : number;
    stopsLocations : Array<String>;
    price : number;
    isRoundTrip : boolean;
    flightClass : FlightClass;
    airline : AirlineCompany

    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
    }
}