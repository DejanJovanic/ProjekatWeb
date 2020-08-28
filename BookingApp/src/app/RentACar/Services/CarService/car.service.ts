import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  //metoda koja vraca sve automobile jedne konkretne kompanije
  getAllCars(){}

  //metoda koja vraca informacije o jednom konkretnom automobilu
  getOneCar(){}

  //metoda koja pretrazuje automobile jedne konkretne kompanije
  searchAllCars(){}

  //metoda koju poziva RentACarAdmin, kako bi dodao novi automobil za kompaniju
  addCar(){}

  //metoda koju poziva RentACarAdmin, kako bi izmenio jedan automobil kompanije
  editCar(){}

  //metoda koju poziva RentACarAdmin, kako bi obrisao jedan automobil kompanije
  deleteCar(){}
}
