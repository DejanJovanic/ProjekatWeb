import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }
  
  //metoda koja vraca sve automobile, jedne konkretne kompanije, koji su na popustu
  getAllCarsOnDiscount(){}

  //metoda koju poziva RentACarAdmin, kako bi definisao period u kojem je automobil kompanije na popustu
  setDiscount(){}

  //metoda koja vraca informacije o jednom konkretnom automobilu koji je na popustu
  getOneCar(){}
}
