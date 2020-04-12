import { SeatStatus } from './SeatStatus.model';

export class Seats{
    rowNum : number;
    colNum : number;
    seats : SeatStatus[][]

    constructor(){
        this.seats = []
    }
}