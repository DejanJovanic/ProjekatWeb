import { Component, OnInit, OnDestroy } from '@angular/core';
import { TicketDataResource } from 'src/app/Shared/Model/Airlines/TicketDataResource.model';
import { AirlineDataService } from '../Services/AirlineData/airline-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CanvasJS from 'src/assets/canvasjs.min.js';
import * as moment from 'moment';
@Component({
  selector: 'app-airline-earnings',
  templateUrl: './airline-earnings.component.html',
  styleUrls: ['./airline-earnings.component.css']
})
export class AirlineEarningsComponent implements OnInit,OnDestroy {

  constructor(private service : AirlineDataService,private builder : FormBuilder) { }
  ngOnDestroy(): void {
    if(this.chart) this.chart.destroy()
  }
  private chart;
  form : FormGroup
  ngOnInit(): void {
    this.form = this.builder.group({
      startDate : ['',Validators.required],
      endDate : ['',Validators.required],
    })
  }

  DrawDailyEarnings(){
    if(this.form.valid){
      let param : TicketDataResource[] = []
      for(let a of this.service.data.getValue().flights){
        for(let b of a.tickets){
          param.push(b);
        }
      }
      let from = new Date(this.form.value.startDate)
      let to = new Date(this.form.value.endDate)
      var temp = this.service.GetEarningsByDay(param,from,to);
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
