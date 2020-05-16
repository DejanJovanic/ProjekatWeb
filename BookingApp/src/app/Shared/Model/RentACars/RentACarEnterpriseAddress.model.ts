//Podaci o lokaciji kompanije. Koristice se klasa i za filijale

export class RentACarEnterpriseAddress{
    constructor(
    public AddressId: number,
    public Country : string,
    public City : string,
    public Street : string,
    public StreetNo : number,
    public ZipCode: number,
    
    ){}

}