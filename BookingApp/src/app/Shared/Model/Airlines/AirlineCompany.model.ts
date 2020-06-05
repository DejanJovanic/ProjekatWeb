import { Airline } from './Airline.model';
import { Flight } from './Flight.model';
import { Airplane } from './Airplane.model';
import { AirlineAddress } from './AirlineAddress.model';
import { Ticket } from './Ticket.model';
import { Seat } from './Seat.model';

export class AirlineCompany{
    id : number;
    name : string;
    description : string;
    address : AirlineAddress;
    grade : number;
    destinations : Array<string>;
    flights : Array<Flight>;
    airplanes : Array<Airplane>
    tickets : Array<Seat>
    constructor (){
        this.tickets = new Array<Seat>();
        this.destinations = new Array<string>();
        this.flights = new Array<Flight>();
        this.airplanes = new Array<Airplane>()
    }
}