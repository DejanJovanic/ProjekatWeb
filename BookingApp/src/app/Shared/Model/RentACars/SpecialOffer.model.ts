//Podaci vezani za "specijalne" usluge rent a car kompanije (cenovnik usluga)

export class SpecialOffer{
    constructor(
        public SpecialOfferId: number,
        public OfferName: string,
        public OfferDiscount: number,
        public OfferDescription: string
        
    ){}
}