import { AirlineCompany } from '../AirlineCompany.model';
import { FlightDatabase } from './FlightDatabase.model';

export class AirlineCompanyDatabase extends AirlineCompany{
    flightsDatabases : FlightDatabase[];
    constructor(){
        super();
        this.flightsDatabases = [];
    }
}