import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SettedDetails } from 'src/app/Shared/Model/Airlines/SettedDetails.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { FlightDetailsService } from '../../AirlineShared/Services/FlightDetails/flight-details.service';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';

@Component({
  selector: 'app-set-details',
  templateUrl: './set-details.component.html',
  styleUrls: ['./set-details.component.css']
})
export class SetDetailsComponent implements OnInit {

  public Details : SettedDetails;
  public FlightDetails : FlightDetails
  @Input() maxWeigth : number;
  @Output() returnValue : EventEmitter<SettedDetails> = new EventEmitter();
  form : FormGroup;

  constructor(public activeModal : NgbActiveModal,private builder : FormBuilder,private flightDetails : FlightDetailsService) {
    this.FlightDetails = flightDetails.details;
   }

  public ShouldBeDisplayed(item) : boolean{
    
    return this.Details.selectedExtras.some(i => i.id == item.id)
  }

  ngOnInit(): void {
    this.Details = new SettedDetails();
    this.Details.selectedExtras = []
    this.form = this.builder.group({
      luggageWeigth:[this.Details.luggageWeigth,[Validators.required,Validators.min(0),Validators.max(this.maxWeigth)]]
    })
  }

  public AddExtra(item : Extra){
    this.Details.selectedExtras.push(item);
  }
  public RemoveExtra(item : Extra){
    this.Details.selectedExtras.splice(this.Details.selectedExtras.indexOf(item),1);
  }

  public Submit(){
    if(this.form.valid){
      this.Details.luggageWeigth = this.form.value.luggageWeigth;
      this.returnValue.emit(this.Details);
      this.activeModal.close()
    }
    ;
  }

}
