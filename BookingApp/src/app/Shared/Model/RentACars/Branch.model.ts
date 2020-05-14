//podaci vezani za filijalu

export class Branch{
    constructor(
        public BranchId: number,
        public BranchName: string,
        public BranchAddress: string,
        public BranchCountry: string,
        public BranchCity: string    
    ){}
}