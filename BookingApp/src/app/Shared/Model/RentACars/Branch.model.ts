//podaci vezani za filijalu

import { RentACarEnterpriseAddress } from './RentACarEnterpriseAddress.model';

export class Branch{
    constructor(
        public BranchId: number,
        public BranchName: string,
        public BranchAddress: RentACarEnterpriseAddress,
        public BranchImage: string
    ){}
}