import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-airplane-modal',
  templateUrl: './add-airplane-modal.component.html',
  styleUrls: ['./add-airplane-modal.component.css']
})
export class AddAirplaneModalComponent implements OnInit {

  constructor(private builder : FormBuilder,public activeModal : NgbActiveModal) { }

  @Output()
  CreatedAirplane : EventEmitter<Airplane> = new EventEmitter()

  form : FormGroup;
  ngOnInit(): void {
    this.form = this.builder.group({
      name : ['',[Validators.required,Validators.pattern(/^[a-zA-Z- ]+$/)]],
      economyClass : true,
      businessClass : true,
      firstClass : true,
      economyRows : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      economyCols : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      businessRows : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      businessCols : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      firstRows : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      firstCols : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]]
    })
    this.form.get('economyClass').valueChanges.subscribe(i =>{
      if(i){
        this.form.get('economyRows').enable();
        this.form.get('economyCols').enable();
      } 
      else{
        this.form.get('economyRows').disable();
        this.form.get('economyCols').disable();
      }
    })
    this.form.get('businessClass').valueChanges.subscribe(i =>{
      if(i){
        this.form.get('businessRows').enable();
        this.form.get('businessCols').enable();
      } 
      else{
        this.form.get('businessRows').disable();
        this.form.get('businessCols').disable();
      }
    })
    this.form.get('firstClass').valueChanges.subscribe(i =>{
      if(i){
        this.form.get('firstRows').enable();
        this.form.get('firstCols').enable();
      } 
      else{
        this.form.get('firstRows').disable();
        this.form.get('firstCols').disable();
      }
    })
  }

  OnSubmit(){
    if(this.form.valid){
      let temp = this.form.value as Airplane;
      this.CreatedAirplane.emit(temp);
      this.activeModal.close();
    }
  }

}
