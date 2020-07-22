import { FlightReservation } from '../Model/Airlines/FlightReservation.model';
import { TicketNetwork } from '../Model/Airlines/TicketNetwork.model';

export interface SetFlightReservationService{
    SetFlightReservation(reservation : FlightReservation) : void;
    SendCurrentReservation() : void;
}