import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor() { }

  //metoda za dodavanje nove filijale, koju poziva rentACarAdmin odredjene kompanije
  addBranch(){}

  //metoda za izmenu jedne filijale, koju poziva rentACarAdmin odredjene kompanije
  editBranch(){}

  //metoda za brisanje jedne filijale, koju poziva rentACarAdmin odredjene kompanije
  deleteBranch(){}

  //metoda za pribavljanje svih filijala odredjene rentACar kompanije
  getAllBranches(){}

  //metoda koja pribavlja informacije o jednoj filijali odredjene kompanije
  getOneBranch(){}

  //metoda koja pribavlja informacije o adresi jedne filijale 
  getBranchLocationOnMap(){}
}
