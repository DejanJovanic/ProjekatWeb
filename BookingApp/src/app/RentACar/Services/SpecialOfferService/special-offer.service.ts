import { Injectable } from '@angular/core';
import { AddSpecialOfferParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddSpecialOfferParameters.model';
import { EditSpecialOfferParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditSpecialOfferParameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpecialOfferService {

  constructor(private client : HttpClient) { }

  //metoda za dodavanje specijalne usluge, koju poziva rentACar admin odredjene kompanije
  addSpecialOffer(specialOffer: AddSpecialOfferParameters){
    return this.client.post('http://localhost:50000/api/SpecialOffer/AddSpecialOffer', specialOffer);
  }

  //metoda za izmenu specijalne usluge, koju poziva rentACar admin odredjene kompanije
  editSpecialOffer(specialOffer: EditSpecialOfferParameters){
    return this.client.put('http://localhost:50000/api/SpecialOffer/EditSpecialOffer', specialOffer);
  }

  //metoda za brisanje specijalne usluge, koju poziva rentACar admin odredjene kompanije
  deleteSpecialOffer(enterpriseId: number, specialOfferId: number){}

  //metoda koja pribavlja sve specijalne usluge
  getAllSpecialOffers(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/SpecialOffer/GetAllSpecialOffers', {
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    });
  }

  //metoda koja pribavlja informacije o jednoj specijalnoj usluzi odredjene kompanije
  getOneSpecialOffer(enterpriseId: number, specialOfferId: number){
    return this.client.get('http://localhost:50000/api/SpecialOffer/GetOneSpecialOffer', {
      params: new HttpParams().set('enterpriseId', enterpriseId.toString()).set('specialOfferId', specialOfferId.toString())
    });
  }
}
