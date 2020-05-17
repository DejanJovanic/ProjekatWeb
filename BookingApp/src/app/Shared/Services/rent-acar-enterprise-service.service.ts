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
    new RentACarEnterpriseAddress(22, "Italy", "Napoli NA", "Aeroporto Di", "0", "80144"),
    new RentACarEnterpriseAddress(23, "Italy", "Sanremo", "Via XX Settembre", "17", "18038"),
    
  ]
  private SpecialOffers: SpecialOffer[] = [
   new SpecialOffer( 
    0, 
    "Free package",
    ["We apologize, but with this package you only get a car"],
    0),

    new SpecialOffer( 
    1,
    "Basic package",
    ["Fuel tank", "Child seat"],
    10),

    new SpecialOffer( 
    2,
    "Advanced package",
    ["Fuel tank", "Child seat", "Winter tires", "Summer tires"],
    20),

    new SpecialOffer( 
    3,
    "Professional package",
    ["Fuel tank", "Child seat", "Winter tires", "Summer tires", "Deep wash", "Polishing wheels"],
    30),

    new SpecialOffer( 
    4,  
    "Expert package",
    ["Fuel tank", "Child seat", "Winter tires", "Summer tires", "Deep wash", "Polishing wheels", "Travel insurance", "GPS"],
    40),

    new SpecialOffer( 
    5,
    "Legend package",
    ["Fuel tank", "Child seat", "Winter tires", "Summer tires", "Deep wash", "Polishing wheels", "Travel insurance", "GPS", "Aluminium wheels",  "Tinted glass"],
    50)
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
      "Audi",
      "R8",
      2020,
      "Limousine",
      "Diesel",
      "Automatic",
      2,
      1000,
      5,
      "https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/640x400/quality/80/https://s.aolcdn.com/commerce/autodata/images/USD00AUC171A021001.jpg"
    ),
    new Car(
      1,
      "Mercedes",
      "G class",
      2015,
      "SUV",
      "Diesel",
      "Automatic",
      5,
      700,
      3,
      "data:image/jpeg;base64,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"
    ),
    new Car(
      2,
      "BMW",
      "x5",
      2015,
      "SUV",
      "Diesel",
      "Automatic",
      5,
      700,
      2,
      "data:image/jpeg;base64,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"
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
      this.SpecialOffers.slice(0, 3)
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
      this.SpecialOffers.slice(3, 6)
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
      this.SpecialOffers.slice(1, 6)
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
      this.SpecialOffers.slice(2, 6)
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
      this.SpecialOffers.slice(3, 6)
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

  getOneCar = index => {

    for(let i: number=0; i < this.RentACars.length; i++){
      if(this.RentACars[i].CarId == index){
        return this.RentACars[i];
      }
    }
    
    
  };

  getAddress = index => {
    for(let i: number=0; i < this.RentACarAddress.length; i++){
      if(this.RentACarAddress[i].AddressId == index){
        return this.RentACarAddress[i];
      }
    }
   
  };
}
