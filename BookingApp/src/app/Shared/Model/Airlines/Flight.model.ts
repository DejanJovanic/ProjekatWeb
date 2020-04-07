export class Flight{
    startDate : Date;
    finishDate : Date;
    travelTime : Number;
    travelDistance : Number;
    numberOfStops : Number;
    stopsLocations : Array<String>;
    price : Number;

    constructor(){
        this.stopsLocations = new Array<String>();
    }
}