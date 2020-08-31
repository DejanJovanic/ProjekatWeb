import { EnterpriseAddress } from '../EnterpriseAddress.model';

export class EditEnterpriseParameters{
    enterpriseId : number;
    name: string;
    description: string;
    address: EnterpriseAddress;

    constructor(){
        this.address = new EnterpriseAddress();
    }
}