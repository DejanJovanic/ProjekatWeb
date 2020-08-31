import { Injectable } from '@angular/core';
import { SearchCarsForRentParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarsForRentParameters.model';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private client : HttpClient) { }


}
