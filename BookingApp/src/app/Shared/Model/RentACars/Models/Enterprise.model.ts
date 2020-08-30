import { EnterpriseAddress } from './EnterpriseAddress.model';
import { EnterpriseBranch } from './EnterpriseBranch.model';
import { EnterpriseRating } from './EnterpriseRating.model';
import { Car } from './Car.model';
import { SpecialOffer } from './SpecialOffer.model';
import { CarReservation } from './CarReservation.model';

export class Enterprise{
    id : number;
    name: string;
    description: string;
    address: EnterpriseAddress;
    branches: EnterpriseBranch[] = [];
    rating: EnterpriseRating[] = [];
    cars: Car[] = [];
    specialOffers: SpecialOffer[] = [];
    reservations: CarReservation[] = [];

    constructor(){}
}