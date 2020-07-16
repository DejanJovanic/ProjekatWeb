import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmptyStringField } from '../../AirlineShared/Validators/EmptyStringField.validator';
import { LoadWeigth } from 'src/app/Shared/Model/Airlines/LoadWeigth.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-load-weigth',
  templateUrl: './load-weigth.component.html',
  styleUrls: ['./load-weigth.component.css']
})
export class LoadWeigthComponent implements OnInit {

  @Input()
  loadOptions : LoadWeigth[]

  form : FormGroup
  constructor(private builder : FormBuilder,public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      from : ['',[Validators.required,Validators.min(0)]],
      to : ['',[Validators.required,Validators.min(0)]],
      price : ['',[Validators.required,Validators.min(0)]]
    })
  }

  RemoveOption(loadOption : LoadWeigth){
    this.loadOptions.splice(this.loadOptions.indexOf(loadOption),1);
  }

  OnSubmit(){
    if(this.form.valid){
      var load = new LoadWeigth();
      load.from = this.form.value.from
      load.to = this.form.value.to
      load.price = this.form.value.price
      this.loadOptions.push(load);
      this.form.get('from').reset()
      this.form.get('to').reset()
      this.form.get('price').reset()
    }
  }

  Close(){
    this.activeModal.close();
  }

}
