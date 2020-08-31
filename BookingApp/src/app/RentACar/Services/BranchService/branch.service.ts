import { Injectable } from '@angular/core';
import { AddBranchParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddBranchParameters.model';
import { EditBranchParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditBranchParameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private client : HttpClient) { }

  //metoda za dodavanje nove filijale, koju poziva rentACarAdmin odredjene kompanije
  addBranch(enterpriseBranch: AddBranchParameters){
    return this.client.post('http://localhost:50000/api/Branch/AddBranch', enterpriseBranch);
  }

  //metoda za izmenu jedne filijale, koju poziva rentACarAdmin odredjene kompanije
  editBranch(enterpriseBranch: EditBranchParameters){
    return this.client.put('http://localhost:50000/api/Branch/EditBranch', enterpriseBranch);
  }

  //metoda za brisanje jedne filijale, koju poziva rentACarAdmin odredjene kompanije
  deleteBranch(enterpriseId: number, branchId: number){
    return this.client.delete('http://localhost:50000/api/Branch/DeleteBranch',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString()).set('branchId', branchId.toString())
    })
  }

  //metoda za pribavljanje svih filijala odredjene rentACar kompanije
  getAllBranches(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/Branch/GetAllBranches', {
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    });
  }

  //metoda koja pribavlja informacije o jednoj filijali odredjene kompanije
  getOneBranch(enterpriseId: number, branchId: number){
    return this.client.get('http://localhost:50000/api/Branch/GetOneBranch', {
      params: new HttpParams().set('enterpriseId', enterpriseId.toString()).set('branchId', branchId.toString())
    });
  }

  //metoda koja pribavlja informacije o adresi jedne filijale 
  getBranchLocationOnMap(branchId: number){
    return this.client.get('http://localhost:50000/api/Branch/GetBranchAddress', {
      params: new HttpParams().set('branchId', branchId.toString())
    });
  }
}
