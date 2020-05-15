//Podaci vezani za Rent a Car kompaniju
import { Car } from "./Car.model";
import { Branch } from "./Branch.model"
import { SpecialOffer } from './SpecialOffer.model';
import { RentACarEnterpriseAddress } from './RentACarEnterpriseAddress.model';

export class RentACarEnterprise{
    constructor(
        public EnterpriseId: number,
        public EnterpriseName: string,
        public EnterpriseAddress: RentACarEnterpriseAddress,
        public EnterpriseDescription: string,
        public EnterpriseRating: number,
        public EnterpriseImage: string,
        public EnterpriseCars: Car[],
        public EnterpriseBranchs: Branch[],
        public EnterpriseOffers: SpecialOffer[]
    ) {}
}