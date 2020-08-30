import { Injectable } from '@angular/core';
import { SetDiscountParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SetDiscountParameters.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor() { }
  
  //metoda koja vraca sve automobile, jedne konkretne kompanije, koji su na popustu
  getAllCarsOnDiscount(enterpriseId: number){}

  //metoda koju poziva RentACarAdmin, kako bi definisao period u kojem je automobil kompanije na popustu
  setDiscount(parameters: SetDiscountParameters){}

  //metoda koja vraca informacije o jednom konkretnom automobilu koji je na popustu
  getOneCarFromDiscount(){}
}
