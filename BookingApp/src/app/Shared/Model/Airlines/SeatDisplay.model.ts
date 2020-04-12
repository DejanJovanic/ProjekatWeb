import { SeatStatus } from './SeatStatus.model';

export class SeatDisplay{
    color: string;
    row : number;
    column : number;
    index : number;
    status : SeatStatus;
    offsetX : number;
    offsetY : number;
}