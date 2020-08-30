import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserFlightDetails } from 'src/app/Shared/Model/Common/UserFlightDetails.model';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Name } from '../../AirlineShared/Validators/Name.validator';
import { Passport } from '../../AirlineShared/Validators/Passport.validator';

@Component({
  selector: 'app-flight-user-details',
  templateUrl: './flight-user-details.component.html',
  styleUrls: ['./flight-user-details.component.css']
})
export class FlightUserDetailsComponent implements OnInit {

  @Input() index : number;
  @Output() returnValue : EventEmitter<UserFlightDetailsModal> = new EventEmitter();
  form : FormGroup;
  details : UserFlightDetailsModal

  constructor(public activeModal : NgbActiveModal,private builder : FormBuilder) { }

  ngOnInit(): void {
    this.details = new UserFlightDetailsModal();
    this.details.index = this.index;
    this.form = this.builder.group({
      name:['',[Validators.required,Name]],
      lastName:['',[Validators.required,Name]],
      passportNum:['',[Validators.required,Passport]]
    })
  }

  Finish(){
    if(this.form.valid){
      this.details.lastName = this.form.value.lastName;
      this.details.name = this.form.value.name;
      this.details.passportNum = this.form.value.passportNum;
      this.returnValue.emit(this.details);
      this.activeModal.close();
    }
  }
}
