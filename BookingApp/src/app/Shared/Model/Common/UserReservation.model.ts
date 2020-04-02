import { FlightReservation } from '../Airlines/FlightReservation.model';
import { CarReservation } from '../RentACars/CarReservation.model';

//Klasa koja ce sadrzati informacije o trenutnoj kreiranoj rezervaciji
export class UserReservation{
    flight : FlightReservation
    car : CarReservation

    constructor(){
        this.flight = null;
        this.car = null;
    }
}