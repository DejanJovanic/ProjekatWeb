import { Injectable } from '@angular/core';
import { EditEnterpriseParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditEnterpriseParameters.model';
import { SearchEnterprisesParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchEnterprisesParameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private client : HttpClient) { }

  //metoda za pribavljanje svih rentACar kompanija
  getAllEnterprises() {
    return this.client.get('http://localhost:50000/api/Enterprise/GetAll');
  }

  //metoda za pribavljanje jedne konkretne rentACar kompanije
  getOneEnterprise(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/Enterprise/GetOneEnterprise',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    })
  }

  //metoda koja pretrazuje sve rentACar kompanije
  searchEnterprises(sep: SearchEnterprisesParameters){
    return this.client.post('http://localhost:50000/api/Enterprise/SearchEnterprises', sep);
  }

  //metoda za izmenu informacija o kompaniji koju poziva rentACar admin te kompanije
  editEnterpriseProfile(enterprise: EditEnterpriseParameters){}

  //metoda koja pribavlja informacije o adresi jedne konkretne kompanije
  getEnterpriseLocationOnMap(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/Enterprise/GetEnterpriseAddress',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    })
  }
}
