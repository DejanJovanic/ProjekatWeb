export class User{
    public username : string;
    public email : string;
    public name : string;
    public lastName: string;
    public passportNo : string;
    public systemRole : string;
    public friends : Array<User>

    constructor(){
        this.friends = new Array<User>();
    }
}