import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, ValidatorFn, FormBuilder, Validators } from '@angular/forms';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import * as moment from 'moment';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';

@Component({
  selector: 'app-rent-acar-enterprise-earnings',
  templateUrl: './rent-acar-enterprise-earnings.component.html',
  styleUrls: ['./rent-acar-enterprise-earnings.component.css']
})
export class RentACarEnterpriseEarningsComponent implements OnInit {
  id: number;
  ret;
  private startFinishDatesValidator : ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('startDate').value;
    const end = fg.get('endDate').value;
  
    if(start && end){
      let temp1 = new Date(start).getTime()
      let temp2 = new Date(end).getTime() 
      return temp1 < temp2 ? null : {dateMissmatch : true};
    }
    return null;
  }
  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute,private builder : FormBuilder) { }
  ngOnDestroy(): void {
    if(this.chart) this.chart.destroy()
  }
  private chart;
  form : FormGroup
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      
    });

    this.form = this.builder.group({
      startDate : ['',Validators.required],
      endDate : ['',Validators.required],
    },{validators : [this.startFinishDatesValidator]})

    this.enterpriseService.getOneEnterprise(this.id).subscribe(i=>{
      this.ret = i;
    })
  }

  DrawDailyEarnings(){
    if(this.form.valid){
      let param : CarReservation[] = []
      for(let i : number = 0; i < this.ret.cars.length; i++){
        for(let j : number = 0; j < this.ret.cars[i].reservations.length; j++){
          param.push(this.ret.cars[i].reservations[j]);
        }
      }
      let from = new Date(this.form.value.startDate)
      let to = new Date(this.form.value.endDate)
      var temp = this.enterpriseService.GetEarningsByDay(param,from,to);
      let items = []
      temp.forEach((value : {date : moment.Moment, amount : number}) =>{
        let current = {y : value.amount, label : value.date.format('YYYY-MMM-DD')}
        items.push(current)
      })
      if(this.chart) this.chart.destroy();
      this.chart = new CanvasJS.Chart("earnings", {
          animationEnabled: true,
          exportEnabled: true,
          title: {
            text: "Earnings by day"
          },
          data: [{
            type: "line",
            dataPoints: items
          }]
        });
      this.chart.render(); 
    }
 
  }

}
