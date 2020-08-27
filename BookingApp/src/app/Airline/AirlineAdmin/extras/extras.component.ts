import { Component, OnInit, Input } from '@angular/core';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmptyStringField } from '../../AirlineShared/Validators/EmptyStringField.validator';
import { Name } from '../../AirlineShared/Validators/Name.validator';
import { DecimalNumber } from '../../AirlineShared/Validators/DecimalNumber.validator';

@Component({
  selector: 'app-extras',
  templateUrl: './extras.component.html',
  styleUrls: ['./extras.component.css']
})
export class ExtrasComponent implements OnInit {

  @Input()
  extras : Extra[]

  form : FormGroup
  constructor(private builder : FormBuilder,public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name : ['',[Validators.required,Name,EmptyStringField]],
      description : [''],
      price : ['',[Validators.required,Validators.min(0),DecimalNumber]]
    })
  }

  RemoveOption(loadOption : Extra){
    this.extras.splice(this.extras.indexOf(loadOption),1);
  }

  OnSubmit(){
    if(this.form.valid){
      var load = new Extra();
      load.name = this.form.value.name
      load.description = this.form.value.description
      load.price = this.form.value.price
      this.extras.push(load);
      this.form.get('name').reset()
      this.form.get('description').reset()
      this.form.get('price').reset()
    }
  }

  Close(){
    this.activeModal.close();
  }

}
