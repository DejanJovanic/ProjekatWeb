import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor() { }

  //metoda za pribavljanje svih rentACar kompanija
  getAllEnterprises(){}

  //metoda za pribavljanje jedne konkretne rentACar kompanije
  getOneEnterprise(){}

  //metoda koja pretrazuje sve rentACar kompanije
  searchEnterprises(){}

  //metoda za izmenu informacija o kompaniji koju poziva rentACar admin te kompanije
  editEnterpriseProfile(){}

  //metoda koja pribavlja informacije o adresi jedne konkretne kompanije
  getEnterpriseLocationOnMap(){}
}
