import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService {

  constructor() { }

  //metoda za dodavanje specijalne usluge, koju poziva rentACar admin odredjene kompanije
  addSpecialOffer(){}

  //metoda za izmenu specijalne usluge, koju poziva rentACar admin odredjene kompanije
  editSpecialOffer(){}

  //metoda za brisanje specijalne usluge, koju poziva rentACar admin odredjene kompanije
  deleteSpecialOffer(){}

  //metoda koja pribavlja sve specijalne usluge
  getAllSpecialOffers(){}

  //metoda koja pribavlja informacije o jednoj specijalnoj usluzi odredjene kompanije
  getOneSpecialOffer(){}
}
