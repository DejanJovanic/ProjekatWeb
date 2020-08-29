import { FlightReservation } from '../Airlines/FlightReservation.model';
import { CarReservation } from '../RentACars/Models/CarReservation.model';
import { TicketNetwork } from '../Airlines/TicketNetwork.model';

//Klasa koja ce sadrzati informacije o trenutnoj kreiranoj rezervaciji
export class UserReservation{
    flight : TicketNetwork[]
    car : CarReservation

    constructor(){
        this.flight = [];
        this.car = null;
    }
}