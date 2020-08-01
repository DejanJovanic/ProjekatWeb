import { Injectable } from '@angular/core';
import { AirlineDataResource } from 'src/app/Shared/Model/Airlines/AirlineDataResource.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { AirlineAdminNetworkService } from '../AirlineAdminNetwork/airline-admin-network.service';
import { tap } from 'rxjs/operators';
import { TicketDataResource } from 'src/app/Shared/Model/Airlines/TicketDataResource.model';
import * as moment from 'moment';
import { FlightDataResource } from 'src/app/Shared/Model/Airlines/FlightDataResource.model';

@Injectable({
  providedIn: 'root'
})
export class AirlineDataService {

  public data : BehaviorSubject<AirlineDataResource>
  constructor(private network : AirlineAdminNetworkService) 
  {
    this.data = new BehaviorSubject(null);
  }

  public GetData() : Observable<AirlineDataResource>{
    return this.network.GetData().pipe(tap(i =>{
      this.data.next(i)

    } ))
  }

  public GetCompanyRating(company : AirlineDataResource) : number{
    return company.airlineRatings.length != 0 ? company.airlineRatings.map(i => i.rate).reduce((acc, a) => acc + a,0) / company.airlineRatings.length : 0;
  }

  public GetRatingByFlight(flights : FlightDataResource[]) : {id : number, rating : number}[]{
    let ret : {id : number, rating : number}[] = []
    let currentRate = 0;
    for(let flight of flights){
      currentRate = flight.flightRatings.length != 0 ? flight.flightRatings.map(i => i.rate).reduce((acc, a) => acc + a,0) / flight.flightRatings.length : 0;
      ret.push({id : flight.id, rating : currentRate});
    }
    return ret;
  }
  public GetWeeklyStats(tickets : TicketDataResource[]) : /*Map<number,Map<number,number>>*/ {date : moment.Moment, count : number;}[] {
  /*   let ret = new Map<number,Map<number,number>>()
    let sortedTickets = tickets.sort((a,b) => {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    })
    for(let ticket of sortedTickets){
      let temp = moment(ticket.bookingDate)
      let tempYear = ret.get(temp.year())
      let week = temp.isoWeek()
      if(tempYear){  
        let tempWeek = tempYear.get(week)
        if(tempWeek){
          tempYear.set(week,tempWeek + 1)
        }
        else{
          tempYear.set(week,1);
        }
      }
      else{
        let tempMap = new Map<number,number>();
        tempMap.set(week,1)
        ret.set(temp.year(),tempMap);
      }

    }
    return ret; */

    let ret : {date : moment.Moment, count : number;}[] = []
    let sortedTickets = tickets.sort((a,b) => {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    })
    
    for(let ticket of sortedTickets){
      let isFound = false
      let temp = moment(ticket.bookingDate)
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
  public GetMonthlyStats(tickets : TicketDataResource[]) : {date : moment.Moment, count : number;}[] {
    let ret : {date : moment.Moment, count : number;}[] = []
    let sortedTickets = tickets.sort((a,b) => {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    })
    for(let ticket of sortedTickets){
      let isFound = false
      let temp = moment(ticket.bookingDate)
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

  public GetDailyStats(tickets : TicketDataResource[]) : {date : moment.Moment, count : number;}[] {
    let ret : {date : moment.Moment, count : number}[] = []
    let sortedTickets = tickets.sort((a,b) => {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    })
    for(let ticket of sortedTickets){
      let isFound = false
      let temp = moment(ticket.bookingDate)
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

  public GetEarningsByDay(tickets : TicketDataResource[],from : Date,to : Date) : {date : moment.Moment, amount : number;}[] {
    let ret : {date : moment.Moment, amount : number}[] = []
    let fromM = moment(from)
    let toM = moment(to)
    let availableTickets : TicketDataResource[] = []
    tickets.forEach((value : TicketDataResource) =>{
      if(moment(value.bookingDate).isBetween(fromM,toM,'day','[]'))
        availableTickets.push(value);
    })
    let sortedTickets = availableTickets.sort((a,b) => {
      return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
    })
    for(let ticket of sortedTickets){
      let isFound = false
      let temp = moment(ticket.bookingDate)
      for(let item of ret){   
        if(item.date.isSame(temp,'day')){
            item.amount += ticket.price;
            isFound = true;
            break;
        }
      }
      if(!isFound){
        ret.push({date : temp, amount : ticket.price})
      }
    }
    return ret;
  }
}

 