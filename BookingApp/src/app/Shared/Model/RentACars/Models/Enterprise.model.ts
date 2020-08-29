import { EnterpriseAddress } from './EnterpriseAddress.model';
import { EnterpriseBranch } from './EnterpriseBranch.model';
import { EnterpriseRating } from './EnterpriseRating.model';
import { Carr } from './Carr.model';
import { SpecialOffer } from './SpecialOffer.model';
import { CarReservation } from './CarReservation.model';

export class Enterprise{
    id : number;
    name: string;
    description: string;
    address: EnterpriseAddress;
    branches: Array<EnterpriseBranch>;
    rating: Array<EnterpriseRating>;
    cars: Array<Carr>;
    specialOffers: Array<SpecialOffer>;
    reservations: Array<CarReservation>;

    constructor (){
        
        this.branches = new Array<EnterpriseBranch>();
        this.rating = new Array<EnterpriseRating>();
        this.specialOffers = new Array<SpecialOffer>();
        this.reservations = new Array<CarReservation>();
    }

}