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
  filterParams : FlightFilterParams;
  @Output() filter : EventEmitter<FlightFilterParams> = new EventEmitter();
  isCollapsed = true;
  constructor(private builder : FormBuilder) { }

  ngOnInit(): void {
    if(localStorage.flightFilter)
      this.filterParams = JSON.parse(localStorage.flightFilter)
    else
      this.filterParams = new FlightFilterParams();
    this.filterForm = this.builder.group(
      {
        priceFrom:['',Validators.min(0)],
        priceTo : ['',Validators.min(0)],
        numberOfStops:['',Validators.min(0)],
        airline:['',Validators.pattern(/^[a-zA-Z- ]+?$/)],
      });
  }

  filterItems(items : Array<AirlineCompany>){
     return items.filter(item => item.name === this.filterForm.value.name);
  }
  onSubmit(){
    let params = new FlightFilterParams();
    params.priceFrom = parseFloat(this.filterForm.value.priceFrom);
    params.priceTo = parseFloat(this.filterForm.value.priceTo);
    params.numberOfStops = parseFloat(this.filterForm.value.numberOfStops);
    params.airline = this.filterForm.value.airline;

    this.filter.emit(params);
  }
}
