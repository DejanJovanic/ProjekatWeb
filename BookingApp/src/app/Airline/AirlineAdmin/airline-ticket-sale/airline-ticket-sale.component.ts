import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketDataResource } from 'src/app/Shared/Model/Airlines/TicketDataResource.model';
import { AirlineDataService } from '../Services/AirlineData/airline-data.service';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
@Component({
  selector: 'app-airline-ticket-sale',
  templateUrl: './airline-ticket-sale.component.html',
  styleUrls: ['./airline-ticket-sale.component.css']
})
export class AirlineTicketSaleComponent implements OnInit,OnDestroy {

  private chart;
  private sub : Subscription
  public showOptions = ["Month","Day","Week"]
  form : FormGroup
  constructor(private service : AirlineDataService,private builder : FormBuilder) { }
  ngOnDestroy(): void {
    if(this.chart) this.chart.destroy()
    if(this.sub) this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      showOption : this.showOptions[0]
    })
    this.sub = this.form.get('showOption').valueChanges.subscribe(i =>{
      switch(i){
        case 'Month':
          this.DrawMonthly();
          break;
        case 'Week':
          this.DrawWeekly();
          break;
        case 'Day':
          this.DrawDaily();
          break;
      }
    })
    this.DrawMonthly();
   
  }

  DrawWeekly(){
    let param : TicketDataResource[] = []
    for(let a of this.service.data.getValue().flights){
      for(let b of a.tickets){
        param.push(b);
      }
    }
    var temp = this.service.GetWeeklyStats(param);
    let items = []
   /*  temp.forEach((value : Map<number,number>,key : number) =>{
      value.forEach((numberOfTickets : number,week : number) =>{
        let item = {y : numberOfTickets, label : key.toString() + "-WEEK-" + week.toString()}
        items.push(item);
      })
    }) */
    temp.forEach((value : {date : moment.Moment, count : number}) =>{
      let current = {y : value.count, label : value.date.format('YYYY-WW')}
      items.push(current)
    })
    if(this.chart) this.chart.destroy();
    this.chart = new CanvasJS.Chart("ticketSale", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Ticket sale by week"
        },
        data: [{
          type: "line",
          dataPoints: items
        }]
      });
    this.chart.render(); 
  }

  DrawMonthly(){
    let param : TicketDataResource[] = []
    for(let a of this.service.data.getValue().flights){
      for(let b of a.tickets){
        param.push(b);
      }
    }
    var temp = this.service.GetMonthlyStats(param);
    let items = []
    temp.forEach((value : {date : moment.Moment, count : number}) =>{
      let current = {y : value.count, label : value.date.format('YYYY-MMM')}
      items.push(current)
    })
    if(this.chart) this.chart.destroy();
    this.chart = new CanvasJS.Chart("ticketSale", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Ticket sale by month"
        },
        data: [{
          type: "line",
          dataPoints: items
        }]
      });
    this.chart.render(); 
  }

  DrawDaily(){
    let param : TicketDataResource[] = []
    for(let a of this.service.data.getValue().flights){
      for(let b of a.tickets){
        param.push(b);
      }
    }
    var temp = this.service.GetDailyStats(param);
    let items = []
    temp.forEach((value : {date : moment.Moment, count : number}) =>{
      let current = {y : value.count, label : value.date.format('YYYY-MMM-DD')}
      items.push(current)
    })
    if(this.chart) this.chart.destroy();
    this.chart = new CanvasJS.Chart("ticketSale", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Ticket sale by day"
        },
        data: [{
          type: "line",
          dataPoints: items
        }]
      });
    this.chart.render(); 
  }

}
