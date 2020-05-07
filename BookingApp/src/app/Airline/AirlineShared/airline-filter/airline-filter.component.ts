import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { FlightFilterParams } from 'src/app/Shared/Model/Airlines/FlightFilterParams.model';

@Component({
  selector: 'app-airline-filter',
  templateUrl: './airline-filter.component.html',
  styleUrls: ['./airline-filter.component.css']
})
export class AirlineFilterComponent implements OnInit {

  filterForm : FormGroup;
  @Output() filter : EventEmitter<FlightFilterParams> = new EventEmitter();
  isCollapsed = true;
  constructor(private builder : FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.builder.group(
      {
        priceFrom:['',Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        priceTo : ['',Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
        startDate:[''],
        finishDate:[''],
        flightDuration:[''],
        

      });
  }

  filterItems(items : Array<AirlineCompany>){
     return items.filter(item => item.name === this.filterForm.value.name);
  }
  onSubmit(){
    let params = new FlightFilterParams();
    params.price = parseFloat(this.filterForm.value.priceFrom);
    if(this.filterForm.value.startDate != null){
      params.startDate = new Date(this.filterForm.value.startDate.year,this.filterForm.value.startDate.month,
        this.filterForm.value.startDate.day);
    }
    this.filter.emit(params);
  }
}
