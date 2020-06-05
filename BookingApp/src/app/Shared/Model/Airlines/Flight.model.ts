import { AirlineCompany } from './AirlineCompany.model';
import { FlightClass } from './FlightClass.model';
import { Airplane } from './Airplane.model';
import { Ticket } from './Ticket.model';
import { FastFlight } from './FastFlight.model';

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
    isRoundTrip : boolean;
    flightClass : FlightClass;
    airline : AirlineCompany
    airplane : Airplane;
    tickets : Ticket[];
    fastFlights : FastFlight[]
    
    constructor(airline : AirlineCompany){
        this.airline = airline;
        this.stopsLocations = new Array<String>();
        this.tickets = [];
        this.fastFlights = [];
    }
}