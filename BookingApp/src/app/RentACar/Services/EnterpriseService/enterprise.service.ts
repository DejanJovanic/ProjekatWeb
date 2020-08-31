import { Injectable } from '@angular/core';
import { EditEnterpriseParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditEnterpriseParameters.model';
import { SearchEnterprisesParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchEnterprisesParameters.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { Observable } from 'rxjs';
import { RatingParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/RatingParameters.model';
import { RentACarAddRentACarAdminModalComponent } from '../../RentACarAdmin/rent-acar-add-rent-acar-admin-modal/rent-acar-add-rent-acar-admin-modal.component';
import { RentACarAdminAddParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminAddParameters.model';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

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
  editEnterpriseProfile(enterprise: EditEnterpriseParameters){
    return this.client.put('http://localhost:50000/api/Enterprise/EditEnterpriseProfile', enterprise);
  }

  //metoda koja pribavlja informacije o adresi jedne konkretne kompanije
  getEnterpriseLocationOnMap(enterpriseId: number){
    return this.client.get('http://localhost:50000/api/Enterprise/GetEnterpriseAddress',{
      params: new HttpParams().set('enterpriseId', enterpriseId.toString())
    })
  }

  
  setRating(rating: RatingParameters){
    return this.client.post('http://localhost:50000/api/Enterprise/SetRating', rating);
  }

  addEnterprise(enterprise: EditEnterpriseParameters){
    return this.client.post('http://localhost:50000/api/Enterprise/AddEnterprise', enterprise);
  }

  GetEarningsByDay(reservations : CarReservation[],from : Date,to : Date) : {date : moment.Moment, amount : number;}[] {
    let ret : {date : moment.Moment, amount : number}[] = []
    let fromM = moment(from)
    let toM = moment(to)
    let availableReservations : CarReservation[] = []
    reservations.forEach((value : CarReservation) =>{
      if(moment(value.rentedDay).isBetween(fromM,toM,'day','[]'))
        availableReservations.push(value);
    })
    let sortedReservations = availableReservations.sort((a,b) => {
      return new Date(a.rentedDay).getTime() - new Date(b.rentedDay).getTime()
    })
    for(let reservation of sortedReservations){
      let isFound = false
      let temp = moment(reservation.rentedDay)
      for(let item of ret){   
        if(item.date.isSame(temp,'day')){
            item.amount += reservation.price;
            isFound = true;
            break;
        }
      }
      if(!isFound){
        ret.push({date : temp, amount : reservation.price})
      }
    }
    
    return ret;

  }

  GetWeeklyStats(param: CarReservation[]):{date : moment.Moment, count : number;}[]{
    let ret : {date : moment.Moment, count : number;}[] = []
    let sortedReservations = param.sort((a,b) => {
      return new Date(a.rentedDay).getTime() - new Date(b.rentedDay).getTime()
    })
    
    for(let reservation of sortedReservations){
      let isFound = false
      let temp = moment(reservation.rentedDay)
      for(let item of ret){   
        if(item.date.isSame(temp,'week')){
            item.count += 1;
            isFound = true;
            break;
        }
      }
      if(!isFound){
        ret.push({date : temp, count : 1})
      }
    }
    return ret;
  }

  GetMonthlyStats(param : CarReservation[]) : {date : moment.Moment, count : number;}[] {
    let ret : {date : moment.Moment, count : number;}[] = []
    let sortedReservations = param.sort((a,b) => {
      return new Date(a.rentedDay).getTime() - new Date(b.rentedDay).getTime()
    })
    for(let reservation of sortedReservations){
      let isFound = false
      let temp = moment(reservation.rentedDay)
      for(let item of ret){   
        if(item.date.isSame(temp,'month')){
            item.count += 1;
            isFound = true;
            break;
        }
      }
      if(!isFound){
        ret.push({date : temp, count : 1})
      }
    }
    return ret;
  }

  GetDailyStats(param : CarReservation[]) : {date : moment.Moment, count : number;}[] {
    let ret : {date : moment.Moment, count : number}[] = []
    let sortedReservations = param.sort((a,b) => {
      return new Date(a.rentedDay).getTime() - new Date(b.rentedDay).getTime()
    })
    for(let reservation of sortedReservations){
      let isFound = false
      let temp = moment(reservation.rentedDay)
      for(let item of ret){   
        if(item.date.isSame(temp,'day')){
            item.count += 1;
            isFound = true;
            break;
        }
      }
      if(!isFound){
        ret.push({date : temp, count : 1})
      }
    }
    return ret;
  }

  getCarReservations(username: string){
    return this.client.get('http://localhost:50000/api/Enterprise/GetReservations',{
      params: new HttpParams().set('username', username.toString())
    })
  }
}
