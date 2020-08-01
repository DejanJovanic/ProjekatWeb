import { RatingResource } from './RatingResource.model';
import { TicketDataResource } from './TicketDataResource.model';

export class FlightDataResource{
    id : number;
    startLocation : string;
    startDate : Date;
    endLocation : string;
    endDate : Date;
    startDateBack : Date;
    endDateBack : Date;
    isRoundTrip : boolean;
    flightRatings : RatingResource[]
    tickets : TicketDataResource[]
}