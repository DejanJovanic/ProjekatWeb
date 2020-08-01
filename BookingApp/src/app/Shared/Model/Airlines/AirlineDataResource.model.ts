import { RatingResource } from './RatingResource.model';
import { FlightDataResource } from './FlightDataResource.model';

export class AirlineDataResource{
    airlineRatings : RatingResource[];
    flights : FlightDataResource[]
}