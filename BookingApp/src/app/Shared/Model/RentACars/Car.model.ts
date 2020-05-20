//Podaci vezani za konkretan automobil

export class Car{
    constructor(
        public CarId: number,
        public CarRentedDates: string[],
        public CarDiscountDateFrom: string,
        public CarDiscountDateTo: string,
        public CarDiscountPrice: number,
        public CarBrand: string,
        public CarModel: string,
        public CarYearOfProduction: number,
        public CarType: string, 
        public CarFuelType: string,
        public CarTransmissionType: string,
        public CarNumberOfSeats: number,
        public CarPrice: number,
        public CarRating: number
    ){}
}