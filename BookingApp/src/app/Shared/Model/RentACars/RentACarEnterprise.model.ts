//Podaci vezani za Rent a Car kompaniju
import { Car } from "./Car.model";

export class RentACarEnterprise{
    constructor(
        public EnterpriseName: string,
        public EnterpriseAddress: string,
        public EnterpriseDescription: string,
        public EnterpriseRating: number,
        public EnterpriseImage: string,
        public EnterpriseCars: Car[]
    ) {}
}