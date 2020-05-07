import { User } from './User.model';

export class AirlineAdmin extends User{
    public airlineID : number;

    constructor(){
        super();
    }
}