import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RentACarAdminAddParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminAddParameters.model';
import { RentACarAdminEditProfile } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminEditProfile.model';
import { PasswordChange } from 'src/app/Shared/Model/RentACars/Models/Parameters/PasswordChange.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private client : HttpClient) { }

  getRentACarAdminAsync(username: string){
    return this.client.get('http://localhost:50000/api/Admin/GetAdmin',{
      params: new HttpParams().set('username', username)
    })
  }

  addRentACarAdmin(parameters: RentACarAdminAddParameters){
    return this.client.post('http://localhost:50000/api/Admin/AddRentAdmin', parameters);
  }

  editAdminProfile(parameters: RentACarAdminEditProfile){
    return this.client.put('http://localhost:50000/api/Admin/EditProfile', parameters);
  }

  changePassword(parameters: PasswordChange){
    return this.client.put('http://localhost:50000/api/Login/ChangePassword', parameters);
  }
}
