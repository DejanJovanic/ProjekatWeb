import { Seat } from './Seat.model';

export class Airplane{
    id : number;
    rows : number;
    columns : number;
    disabledSeats : Seat[];
    removedSeats : Seat[];
}