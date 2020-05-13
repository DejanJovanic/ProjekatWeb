import { Injectable } from '@angular/core';
import { RentACarEnterprise } from "../Model/RentACars/RentACarEnterprise.model";
import { Car } from "../Model/RentACars/Car.model";
import { Branch } from '../Model/RentACars/Branch.model';

@Injectable({
  providedIn: 'root'
})
export class RentACarEnterpriseServiceService {
  private Branches: Branch[] = [
    new Branch(
      "Filijala 1",
      "Adresa 1",
      "Srbija",
      "Beograd"

    ),
    new Branch(
      "Filijala 1",
      "Adresa 1",
      "Francuska",
      "Pariz"

    ),
    new Branch(
      "Filijala 1",
      "Adresa 1",
      "Nemacka",
      "Berlin"

    )
  ]
  private RentACars: Car[] = [
    
    new Car(
      "Ferari",
      "Ferari",
      2020,
      "Limousine",
      "Diesel",
      "Automatic",
      3,
      1000,
      5,
      "https://www.automagazin.rs/slike/vesti/20190530080049_photo_1.jpg"
    ),
    new Car(
      "BMW",
      "BMW x5",
      2015,
      "Jeep",
      "Diesel",
      "Automatic",
      5,
      700,
      4.9,
      "https://www.cstatic-images.com/car-pictures/xl/usd00bmc931a021001.png"
    ),
    new Car(
      "BMW",
      "BMW x5",
      2015,
      "Jeep",
      "Diesel",
      "Automatic",
      5,
      700,
      4.9,
      "https://www.cstatic-images.com/car-pictures/xl/usd00bmc931a021001.png"
    )
  ];
   
  private RentACarEnterprises: RentACarEnterprise[] = [
    new RentACarEnterprise(
      0,
      "Enterprise",
      "Aerodrom Beograd 59, Belgrade 11180",
      "OUR RESPONSE. OUR RESPONSIBILITY. Why we’re open and what we’re doing to better protect customers and employees.",
      2,
      "../../assets/EnterpriseCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(0, 3)
    ),
    new RentACarEnterprise(
      1,
      "Hertz",
      "79 Oliver Tambo Road, Bloemfontein Central, Bloemfontein, 9301, South Africa",
      "For those who want the ultimate car rental experience.",
      5,
      "../../assets/HertzCarRental.jpg",
      this.RentACars.slice(0, 3) ,
      this.Branches.slice(0, 3)
    ),
    new RentACarEnterprise(
      2,
      "National",
      "Chora Naxou, Naxos 84300, GR",
      "A faster, more convenient experience every time you rent a vehicle.",
      5,
      "../../assets/NationalCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(0, 3) 
    ),
    new RentACarEnterprise(
      3,
      "Alamo",
      "8400 Airport Blvd Mobile, AL 36608 US",
      "Drive away with more money in your pockets and more time on your itinerary.",
      4,
      "../../assets/AlamoCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(0, 3) 
    ),

    new RentACarEnterprise(
      4,
      "Budget",
      "Parsippany-Troy Hills, New Jersey, United States",
      "Book with CONFIDENCE. Whereever you need to go, we've got you.",
      3.5,
      "../../assets/BudgetCarRental.jpg",
      this.RentACars.slice(0, 3),
      this.Branches.slice(0, 3) 
    ),

    new RentACarEnterprise(
      5,
      "Avis",
      "Aerodrom Beograd 59, Belgrade 11180",
      "Avis is here for you. Experience Avis with our car rental offers just for you.",
      1.5,
      "../../assets/AvisCarRental.jpg",
      this.RentACars.slice(0, 3) ,
      this.Branches.slice(0, 3)
    )
  ];
  constructor() { }

  getRentACarEnterprises = () => {
    return this.RentACarEnterprises;
  };

  getRentACarEnterprise(index: number) {
    return this.RentACarEnterprises[index];
  }

  getRentACars = () => {
    return this.RentACars;
  };

  getOneCar = index => {
    return this.RentACars[index];
  };
}
