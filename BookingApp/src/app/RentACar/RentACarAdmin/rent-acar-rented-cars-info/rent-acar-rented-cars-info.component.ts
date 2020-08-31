import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';

@Component({
  selector: 'app-rent-acar-rented-cars-info',
  templateUrl: './rent-acar-rented-cars-info.component.html',
  styleUrls: ['./rent-acar-rented-cars-info.component.css']
})
export class RentACarRentedCarsInfoComponent implements OnInit {
  private chart;
  private sub : Subscription
  public showOptions = ["Month","Day","Week"]
  form : FormGroup
  ret;
  id: number;
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute,private builder : FormBuilder) { }
  ngOnDestroy(): void {
    if(this.chart) this.chart.destroy()
    if(this.sub) this.sub.unsubscribe();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      
    });
    this.form = this.builder.group({
      showOption : this.showOptions[0]
    })

    this.enterpriseService.getOneEnterprise(this.id).subscribe(i=>{
      this.ret = i;
      
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
    
   
  }

    DrawMonthly(){
      let param : CarReservation[] = []
      for(let i : number = 0; i < this.ret.cars.length; i++){
        for(let j : number = 0; j < this.ret.cars[i].reservations.length; j++){
          param.push(this.ret.cars[i].reservations[j]);
        }
      }
      var temp = this.enterpriseService.GetMonthlyStats(param);
      let items = []
      temp.forEach((value : {date : moment.Moment, count : number}) =>{
        let current = {y : value.count, label : value.date.format('YYYY-MMM')}
        items.push(current)
      })
      if(this.chart) this.chart.destroy();
      this.chart = new CanvasJS.Chart("rentedCars", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Rented cars by month"
          },
          data: [{
            type: "line",
            dataPoints: items
          }]
        });
      this.chart.render(); 
    }

    DrawWeekly(){
      let param : CarReservation[] = []
      for(let i : number = 0; i < this.ret.cars.length; i++){
        for(let j : number = 0; j < this.ret.cars[i].reservations.length; j++){
          param.push(this.ret.cars[i].reservations[j]);
        }
      }
      var temp = this.enterpriseService.GetWeeklyStats(param);
      let items = []
    
      temp.forEach((value : {date : moment.Moment, count : number}) =>{
        let current = {y : value.count, label : value.date.format('YYYY-WW')}
        items.push(current)
      })
      if(this.chart) this.chart.destroy();
      this.chart = new CanvasJS.Chart("rentedCars", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Rented cars by week"
          },
          data: [{
            type: "line",
            dataPoints: items
          }]
        });
      this.chart.render(); 
    }
    DrawDaily(){
      let param : CarReservation[] = []
      for(let i : number = 0; i < this.ret.cars.length; i++){
        for(let j : number = 0; j < this.ret.cars[i].reservations.length; j++){
          param.push(this.ret.cars[i].reservations[j]);
        }
      }
      var temp = this.enterpriseService.GetDailyStats(param);
      let items = []
      temp.forEach((value : {date : moment.Moment, count : number}) =>{
        let current = {y : value.count, label : value.date.format('YYYY-MMM-DD')}
        items.push(current)
      })
      if(this.chart) this.chart.destroy();
      this.chart = new CanvasJS.Chart("rentedCars", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Rented cars by day"
          },
          data: [{
            type: "line",
            dataPoints: items
          }]
        });
      this.chart.render(); 
    }
  }


