import { IUser } from './IUser.model';

export class User implements IUser{
    public username : string;
    public email : string;
    public name : string;
    public lastName: string;
    public city : string;
    public points : number;
    public phoneNumber : string;
    public passportNo : string;
    public systemRole : string;
    public friends : Array<User>
    public address : string;
    public password : string;
    constructor(){
        this.friends = new Array<User>();
    }
}