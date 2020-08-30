import { Injectable } from '@angular/core';
import { AddCarParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddCarParameters.model';
import { EditCarparameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditCarParameters.model';

import { SearchCarParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarParameters.model';
import { SearchCarsForRentParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarsForRentParameters.model';
import { SetDiscountParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SetDiscountParameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { CarReservationParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/CarReservationParameters.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private client : HttpClient) { }

  //metoda koja vraca sve automobile jedne konkretne kompanije
  getAllCars(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/Car/GetAllCars',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    })
  }

  //metoda koja vraca informacije o jednom konkretnom automobilu
  getOneCar(enterpriseId: number, carId: number){
    return this.client.get('http://localhost:50000/api/Car/GetOneCar',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString()).set('carId', carId.toString())
    })
  }

  searchCarsForRent(scfrp: SearchCarsForRentParameters){
    return this.client.post('http://localhost:50000/api/Car/SearchCarsForRent', scfrp);
  }
  //metoda koja pretrazuje automobile jedne konkretne kompanije
  searchAllCars(scp: SearchCarParameters){
    return this.client.post('http://localhost:50000/api/Car/SearchAllCars', scp);
  }

  //metoda koju poziva RentACarAdmin, kako bi dodao novi automobil za kompaniju
  addCar(car: AddCarParameters){
    return this.client.post('http://localhost:50000/api/Car/AddCar', car);
  }

  //metoda koju poziva RentACarAdmin, kako bi izmenio jedan automobil kompanije
  editCar(car: EditCarparameters){
    return this.client.post('http://localhost:50000/api/Car/EditCar', car);
  }

  //metoda koju poziva RentACarAdmin, kako bi obrisao jedan automobil kompanije
  deleteCar(enterpriseId: number, carId: number){
    {
      return this.client.delete('http://localhost:50000/api/Car/DeleteCar',{
        params: new HttpParams().set('enterpriseId', enterpriseId.toString()).set('carId', carId.toString())
      })
    }
  }

  createReservation(params: CarReservationParameters){
    return this.client.post('http://localhost:50000/api/Car/CreateReservation', params);
  }

  

  
}
