//Podaci vezani za Rent a Car kompaniju
import { Car } from "./Car.model";
import { Branch } from "./Branch.model"

export class RentACarEnterprise{
    constructor(
        public EnterpriseId: number,
        public EnterpriseName: string,
        public EnterpriseAddress: string,
        public EnterpriseDescription: string,
        public EnterpriseRating: number,
        public EnterpriseImage: string,
        public EnterpriseCars: Car[],
        public EnterpriseBranchs: Branch[]
    ) {}
}