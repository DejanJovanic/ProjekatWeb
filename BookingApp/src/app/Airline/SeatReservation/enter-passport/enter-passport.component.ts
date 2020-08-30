import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Passport } from '../../AirlineShared/Validators/Passport.validator';

@Component({
  selector: 'app-enter-passport',
  templateUrl: './enter-passport.component.html',
  styleUrls: ['./enter-passport.component.css']
})
export class EnterPassportComponent implements OnInit {

  @Output() returnValue : EventEmitter<string> = new EventEmitter();
  form : FormGroup;

  constructor(public activeModal : NgbActiveModal,private builder : FormBuilder) { }

  ngOnInit(): void {

    this.form = this.builder.group({
      passportNum:['',[Validators.required,Passport]]
    })
  }

  Finish(){
    if(this.form.valid){
      this.returnValue.emit(this.form.value.passportNum);
      this.activeModal.close();
    }
   
  }

}
