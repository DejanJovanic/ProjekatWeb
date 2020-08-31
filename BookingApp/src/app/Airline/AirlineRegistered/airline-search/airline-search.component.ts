import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FlightSearchService } from '../Services/FlightSearch/flight-search.service';
import { Subscription } from 'rxjs';
import { FlightSearchParams } from 'src/app/Shared/Model/Airlines/FlightSearchParams.model';
import { FlightClass } from 'src/app/Shared/Model/Airlines/FlightClass.model';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { EmptyStringField } from '../../AirlineShared/Validators/EmptyStringField.validator';
import { Name } from '../../AirlineShared/Validators/Name.validator';

@Component({
  selector: 'app-airline-search',
  templateUrl: './airline-search.component.html',
  styleUrls: ['./airline-search.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class AirlineSearchComponent implements OnInit {
  private startFinishDatesValidator : ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('startDate').value;
    const end = fg.get('finishDate').value;
  
    let temp1 = new Date(start).getTime()
    let temp2 = new Date(end).getTime() 
    return temp1 <= temp2 ? null : {startEndDate : true};
  }
  private Date1Validator : ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('startDate').value;

  
    let temp1 = new Date(start).getTime()
    let date = new Date().getTime()
    return date <= temp1 ? null : {startDate : true};
  }
  private Date2Validator : ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('finishDate').value;

  
    let temp1 = new Date(start).getTime()
    let date = new Date().getTime()
    return date <= temp1 ? null : {finishDate : true};
  }
  public searchForm : FormGroup
  private searchParams : FlightSearchParams
  @Output()
  public search : EventEmitter<FlightSearchParams> = new EventEmitter<FlightSearchParams>()
  isCollapsed = true;
  classes : string[] = []
  constructor(private builder : FormBuilder) {
    this.classes = Object.keys(FlightClass).filter(i => isNaN(Number(i)))
   }


  ngOnInit(): void {

      this.searchParams = null

    this.searchForm = this.builder.group({
      startLocation : [this.searchParams? this.searchParams.startLocation : '',[Validators.required,Name,EmptyStringField]],
      endLocation : [this.searchParams? this.searchParams.endLocation : '',[Validators.required,Name,EmptyStringField]],
      startDate : ['',Validators.required],
      finishDate : ['',Validators.required],
      isRoundTrip : [this.searchParams ? this.searchParams.isRoundTrip : false],
      isMultiCity : [this.searchParams ? this.searchParams.isMultiCity : false],
      class : [this.classes[0]],
    },{validators:[this.startFinishDatesValidator,this.Date1Validator,this.Date2Validator]})
  }

  Submit(){
    if(this.searchForm.valid){
      this.searchParams = new FlightSearchParams();
      this.searchParams.startLocation = this.searchForm.value.startLocation;
      this.searchParams.endLocation = this.searchForm.value.endLocation;
      this.searchParams.isRoundTrip  = this.searchForm.value.isRoundTrip;
      this.searchParams.isMultiCity = this.searchForm.value.isMultiCity;
      this.searchParams.flightClass = this.searchForm.value.class;
      this.searchParams.startDate = new Date(this.searchForm.value.startDate);
      this.searchParams.endDate = new Date(this.searchForm.value.finishDate);
      this.search.emit(this.searchParams);
    }
  }
}
