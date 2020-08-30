import { Injectable } from '@angular/core';
import { SearchCarsForRentParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarsForRentParameters.model';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  //metoda koja kreira rezervaciju
  setReservation(parameters: CarReservation){}

  //metoda koja racuna ukupan broj dana za rezervaciju automobila
  calculateNumberOfDays(){}

  //metoda za otkazivanje rezervacije
  cancelReservation(){}

  //metoda koja racuna ukupnu cenu kostanja rezervacije
  calculateSum(){}

  //metoda koja vraca automobile koji ispunjavaju kriterijum pretrage, koju korisnik prvo mora da izvrsi
  searchCarsForRent(scfrp: SearchCarsForRentParameters){}
}
