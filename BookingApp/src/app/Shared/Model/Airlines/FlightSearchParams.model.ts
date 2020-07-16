import { FlightClass } from './FlightClass.model';

export class FlightSearchParams{
    startLocation : string;
    startDate : Date;
    endLocation : string;
    endDate : Date;
    isRoundTrip : boolean;
    isMultiCity : boolean;
    flightClass : FlightClass;
    constructor(){}
}