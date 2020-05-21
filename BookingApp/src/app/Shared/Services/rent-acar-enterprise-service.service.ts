import { Injectable } from '@angular/core';
import { RentACarEnterprise } from "../Model/RentACars/RentACarEnterprise.model";
import { Car } from "../Model/RentACars/Car.model";
import { Branch } from '../Model/RentACars/Branch.model';
import { SpecialOffer } from '../Model/RentACars/SpecialOffer.model';
import { RentACarEnterpriseAddress } from '../Model/RentACars/RentACarEnterpriseAddress.model';

@Injectable({
  providedIn: 'root'
})
export class RentACarEnterpriseServiceService {

  private RentACarAddress: RentACarEnterpriseAddress[] = [
  
    new RentACarEnterpriseAddress(0, "Bosnia & Herzegovina", "Tuzla", "Aleja Alije Izetbegovića", "3", "75000"),
    new RentACarEnterpriseAddress(1, "Serbia", "Belgrade", "Đorđa Stanojevića", "14", "11070"),
    new RentACarEnterpriseAddress(2, "United Arab Emirates", "Dubai", "Al TwarAl Twar", "3", "0"),
    new RentACarEnterpriseAddress(3, "United States", "Alamo", "US-83 BUS", "143", "78537"),
    new RentACarEnterpriseAddress(4, "United States", "Weslaco", "2401 E Expressway", "83", "78599"),
    new RentACarEnterpriseAddress(5, "United States", "McAllen", "S Bicentennial Blvd", "2500", "78503"),
 

   //Enterprise filijale
    new RentACarEnterpriseAddress(6, "Serbia", "Belgrade", "Aerodrom Beograd", "59", "11180"),
    new RentACarEnterpriseAddress(7, "France", "Amiens", "Rue Saint-Fuscien", "29", "80000"),
    new RentACarEnterpriseAddress(8, "Germany", "München", "Terminalstraße Mitte Mietwagenzentrum", "0", "85356"),


    //Hertz filijale (London, Moskva, Tuzla)
    new RentACarEnterpriseAddress(9, "United Kingdom", "Chester", "Sealand Rd", "0", "19013"),
    new RentACarEnterpriseAddress(10, "Russia", "Samara", "Ulitsa Osipenko", "3", "443110"),
    new RentACarEnterpriseAddress(11, "Austria", "Salzburg", "Innsbrucker Bundesstraße", "95", "5020"),
    //////////////////////////////////////////////

    //National filijale (Bec, Prag, Budimpesta)
    new RentACarEnterpriseAddress(12, "Köln", "Frankfurt am Main", "Kennedystrasse Mietwagenzentr", "59", "51147"),
    new RentACarEnterpriseAddress(13, "Zaventem", "Belgium", "National Airport Arrival Hall - Box/Bus", "88", "1930"),
    new RentACarEnterpriseAddress(14, "France", "Caen", "Aeroport De Caen Carpiquet", "0", "14000" ),
    /////////////////////////////////////////////

    //Alamo filijale (Madrid, Barselona, Valencia)
    new RentACarEnterpriseAddress(15, "Netherlands", "Amsterdam", "Harry Banninkstraat", "129", "1011"),
    new RentACarEnterpriseAddress(16, "Spain", "Sevilla", "Aeropuerto De San Pablo", "0", "41001"),
    new RentACarEnterpriseAddress(17, "Spain", "Ourense", "Estacion De Tren", "0", "32001"),

    //Budget filijale (Kijev, Sao Paulo, Buenos ajres)
    new RentACarEnterpriseAddress(18, "Romania", "Timișoara", "Airport Street Ghiroda, Timisoara Airport", "0", "307200"),
    new RentACarEnterpriseAddress(19, "Croatia", "Kaštel Kambelovac", "Cesta Dr. Franje Tuđmana", "96", "21214"),
    new RentACarEnterpriseAddress(20, "Slovenia", "Ljubljana", "Miklošičeva cesta", "3", "1000"),

    //Avis filijale (Nju jork, Cikago, Toronto)
    new RentACarEnterpriseAddress(21, "Switzerland", "Biel", "Zollhaus Automobiel Sarl, Solothurnstrasse", "79", "2504"),
    new RentACarEnterpriseAddress(22, "Italy", "Napoli", "Aeroporto Di", "0", "80144"),
    new RentACarEnterpriseAddress(23, "Italy", "Sanremo", "Via XX Settembre", "17", "18038"),
    
  ]
  private SpecialOffers: SpecialOffer[] = [
   new SpecialOffer( 
    0, 
    "GPS",
    8),

    new SpecialOffer( 
    1,
    "Fuel Tank",
    10),

    new SpecialOffer( 
    2,
    "Child seat",
    4),
    
    new SpecialOffer(
      3,
      "Winter tires",
      5
    ),

    new SpecialOffer(
      4,
      "Summer tires",
      5
    ),

    new SpecialOffer(
      5,
      "Deep wash",
      2
    ),

    new SpecialOffer(
      6,
      "Polishing wheels",
      3
    ),
    new SpecialOffer( 
    7,
    "Travel insurance",
    10),

    new SpecialOffer( 
      8,
      "Car insurance",
      10),

    new SpecialOffer( 
    9,  
    "Aluminium wheels",
    15),

    new SpecialOffer( 
    10,
    "Tinted glass",
    20)
  ]
  private Branches: Branch[] = [
    new Branch(
      0,
      "Enterprise Belgrade, Serbia",
      this.RentACarAddress[6]

    ),
    new Branch(
      1,
      "Enterprise Pariz, France",
      this.RentACarAddress[7]
    ),
    new Branch(
      2,
      "Enterprise München, Germany",
      this.RentACarAddress[8]
    ),
    new Branch(
      3,
      "Hertz Chester, United Kingdom",
      this.RentACarAddress[9]

    ),
    new Branch(
      4,
      "Hertz Samara, Russia",
      this.RentACarAddress[10]

    ),
    new Branch(
      5,
      "Hertz Salzburg, Austria",
      this.RentACarAddress[11]

    ),
    new Branch(
      6,
      "National Köln, Germany",
      this.RentACarAddress[12]

    ),
    new Branch(
      7,
      "National Zaventem, Belgium",
      this.RentACarAddress[13]

    ),
    new Branch(
      8,
      "National Caen, France",
      this.RentACarAddress[14]

    ),
    new Branch(
      9,
      "Alamo Amsterdam, Netherlands",
      this.RentACarAddress[15]

    ),
    new Branch(
      10,
      "Alamo Sevilla, Spain",
      this.RentACarAddress[16]

    ),
    new Branch(
      11,
      "Alamo Ourense, Spain",
      this.RentACarAddress[17]

    ),
    new Branch(
      12,
      "Budget Timișoara, Romania",
      this.RentACarAddress[18]

    ),
    new Branch(
      13,
      "Budget Kaštel Kambelovac, Croatia",
      this.RentACarAddress[19]

    ),
    new Branch(
      14,
      "Budget Ljubljana, Slovenia",
      this.RentACarAddress[20]

    ),
    new Branch(
      15,
      "Avis Biel, Switzerland",
      this.RentACarAddress[21]

    ),
    new Branch(
      16,
      "Avis Napoli, Italy",
      this.RentACarAddress[22]

    ),
    new Branch(
      17,
      "Avis Sanremo, Italy",
      this.RentACarAddress[23]
    )
  ]
  private RentACars: Car[] = [
    
    new Car(
      0,
      ["Fri May 22 2020", "Sat May 30 2020"],
      "Mon May 18 2020",
      "Thu May 21 2020",
      0,
      "Audi",
      "R8",
      2020,
      "Limousine",
      "Diesel",
      "Automatic",
      2,
      1000,
      5
    ),
    new Car(
      1,
      ["Sun Jun 21 2020", "Fri May 29 2020"],
      "Fri May 22 2020",
      "Sat May 23 2020",
      0,
      "Mercedes",
      "G class",
      2015,
      "SUV",
      "Diesel",
      "Automatic",
      5,
      700,
      3
    ),
    new Car(
      2,
      ["Mon May 18 2020", "Fri Jun 12 2020"],
      "Thu May 21 2020",
      "Thu May 21 2020",
      0,
      "BMW",
      "x5",
      2015,
      "SUV",
      "Diesel",
      "Automatic",
      5,
      700,
      2
    )
  ];
   
  private RentACarEnterprises: RentACarEnterprise[] = [
    new RentACarEnterprise(
      0,
      "Enterprise",
      this.RentACarAddress[0],
      "OUR RESPONSE. OUR RESPONSIBILITY. Why we’re open and what we’re doing to better protect customers and employees.",
      2,
      "../../assets/EnterpriseCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(0, 3),
      this.SpecialOffers.slice(0, 10)
    ),
    new RentACarEnterprise(
      1,
      "Hertz",
      this.RentACarAddress[1],
    
      "For those who want the ultimate car rental experience.",
      5,
      "../../assets/HertzCarRental.jpg",
      this.RentACars.slice(0, 3) ,
      this.Branches.slice(3, 6),
      this.SpecialOffers.slice(2, 10)
    ),
    new RentACarEnterprise(
      2,
      "National",
      this.RentACarAddress[2],
     
      "A faster, more convenient experience every time you rent a vehicle.",
      5,
      "../../assets/NationalCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(6, 9),
      this.SpecialOffers.slice(0, 6)
    ),
    new RentACarEnterprise(
      3,
      "Alamo",
      this.RentACarAddress[3],
      
      "Drive away with more money in your pockets and more time on your itinerary.",
      4,
      "../../assets/AlamoCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(9, 12),
      this.SpecialOffers.slice(1, 8)
    ),

    new RentACarEnterprise(
      4,
      "Budget",
      this.RentACarAddress[4],
   
      "Book with CONFIDENCE. Whereever you need to go, we've got you.",
      3.5,
      "../../assets/BudgetCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(12, 15),
      this.SpecialOffers.slice(4, 10)
    ),

    new RentACarEnterprise(
      5,
      "Avis",
      this.RentACarAddress[5],
     
      "Avis is here for you. Experience Avis with our car rental offers just for you.",
      1.5,
      "../../assets/AvisCarRental.jpg",
      this.RentACars.slice(0, 3) ,
      this.Branches.slice(15, 18),
      this.SpecialOffers.slice(1, 10)
    )
  ];
  constructor() { }

  getRentACarEnterprises = () => {
    return this.RentACarEnterprises;
  };

  getRentACarEnterprise(index: number) {

    for(let i: number=0; i < this.RentACarEnterprises.length; i++){
      if(this.RentACarEnterprises[i].EnterpriseId == index){
        return this.RentACarEnterprises[i];
      }
    }
  }

  getRentACars = () => {
    return this.RentACars;
  };

  getOneCar(carId:number, enterpriseId:number){
    
    return this.RentACarEnterprises[enterpriseId].EnterpriseCars[carId];
     
  };

  getAddress = index => {
    for(let i: number=0; i < this.RentACarAddress.length; i++){
      if(this.RentACarAddress[i].AddressId == index){
        return this.RentACarAddress[i];
      }
    }
   
  };
}
