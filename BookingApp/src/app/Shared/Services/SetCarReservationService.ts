import { CarReservation } from '../Model/RentACars/CarReservation.model';

export interface SetCarReservationService{
    SetCarReservation(reservation : CarReservation);
    
    SendCurrentReservation(): void;
}