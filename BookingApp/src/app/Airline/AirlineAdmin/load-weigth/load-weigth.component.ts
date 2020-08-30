import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmptyStringField } from '../../AirlineShared/Validators/EmptyStringField.validator';
import { LoadWeigth } from 'src/app/Shared/Model/Airlines/LoadWeigth.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalNumber } from '../../AirlineShared/Validators/DecimalNumber.validator';

@Component({
  selector: 'app-load-weigth',
  templateUrl: './load-weigth.component.html',
  styleUrls: ['./load-weigth.component.css']
})
export class LoadWeigthComponent implements OnInit {

  @Input()
  loadOptions : LoadWeigth[]
  loadError : boolean;
  form : FormGroup
  constructor(private builder : FormBuilder,public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      from : ['',[Validators.required,Validators.min(0),DecimalNumber]],
      to : ['',[Validators.required,Validators.min(0),DecimalNumber]],
      price : ['',[Validators.required,Validators.min(0),DecimalNumber]]
    })
  }

  RemoveOption(loadOption : LoadWeigth){
    this.loadOptions.splice(this.loadOptions.indexOf(loadOption),1);
  }

  OnSubmit(){
    if(this.form.valid){
      let isOk = true
      let from = parseFloat(this.form.value.from)
      let to  = parseFloat(this.form.value.to)
      let price = parseFloat(this.form.value.price)
      for(let a of this.loadOptions){
        if((a.from <= from && a.to >= from) || (a.from <= to && a.to >= to)){
          isOk = false;
          this.loadError = true;
        }
      }
      if(isOk){
        this.loadError = false;
        var load = new LoadWeigth();
        load.from = from
        load.to = to
        load.price = price 
        this.loadOptions.push(load);
        this.form.get('from').reset()
        this.form.get('to').reset()
        this.form.get('price').reset()
      }

    }
  }

  Close(){
    this.activeModal.close();
  }

}
