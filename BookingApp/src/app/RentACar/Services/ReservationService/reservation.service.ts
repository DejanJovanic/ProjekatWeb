import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  //metoda koja kreira rezervaciju
  setReservation(){}

  //metoda koja racuna ukupan broj dana za rezervaciju automobila
  calculateNumberOfDays(){}

  //metoda za otkazivanje rezervacije
  cancelReservation(){}

  //metoda koja racuna ukupnu cenu kostanja rezervacije
  calculateSum(){}

  //metoda koja vraca automobile koji ispunjavaju kriterijum pretrage, koju korisnik prvo mora da izvrsi
  searchAllCars(){}
}
