import { AirlineCompany } from './AirlineCompany.model';
import { FlightClass } from './FlightClass.model';
import { Airplane } from './Airplane.model';
import { Ticket } from './Ticket.model';
import { Extra } from './Extra.model';
import { LoadWeigth } from './LoadWeigth.model';

export class Flight{
    id : number;
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
    distance : number;
    isRoundTrip : boolean;
    flightClass : FlightClass;
    airline : AirlineCompany
    airplane : Airplane;
    tickets : Ticket[];
    weightPricings : LoadWeigth[]
    extras : Extra[]
    loadInCabin : number;
    isFromSearch : boolean
    isFromFastFlight : boolean
    
    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
        this.tickets = [];
    }
}