import { Injectable } from '@angular/core';
import { AirlineCompany} from "../../../Shared/Model/Airlines/AirlineCompany.model"
import { range } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AirlineGetterService {
  private companies : Array<AirlineCompany>;
  constructor() { 
    this.companies = new Array<AirlineCompany>();
    for(let i = 0; i < 10; i++ ){
      let company = new AirlineCompany();
      company.name = "Company-" + i;
      company.description = "Great company-" + i;
      company.grade = i;
      this.companies.push(company);
    }
  }

  public GetAirlineCompanies() : Array<AirlineCompany>{
    return this.companies;
  }
}
