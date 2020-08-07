export class ReservationConfirmation{
    public airlineId : number
    public flightId : number
    public ticketId : number
    public passportNumber : string
    public luggageWeight : number
    public selectedExtras : number[]
    public investingPoints : boolean
    constructor(){
        this.selectedExtras = [];
    }
}