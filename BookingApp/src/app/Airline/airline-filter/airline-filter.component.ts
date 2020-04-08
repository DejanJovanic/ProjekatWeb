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
    this.filterForm = this.builder.group({price:['', Validators.required]});
  }

  filterItems(items : Array<AirlineCompany>){
     return items.filter(item => item.name === this.filterForm.value.name);
  }
  onSubmit(){
    let params = new FlightFilterParams();
    params.price = parseFloat(this.filterForm.value.price);
    this.filter.emit(params);
  }
}
