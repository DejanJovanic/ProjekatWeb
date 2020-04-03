import { Airline } from './Airline.model';

export class AirlineCompany{
    name : string;
    description : string;
    grade : number;
    airlines : Array<Airline>;
}