import { FlightReservation } from '../Model/Airlines/FlightReservation.model';

export interface SetFlightReservationService{
    SetFlightReservation(reservation : FlightReservation) : void;
    SendCurrentReservation() : void;
}