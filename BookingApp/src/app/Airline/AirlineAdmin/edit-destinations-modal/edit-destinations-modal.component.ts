import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmptyStringField } from '../../AirlineShared/Validators/EmptyStringField.validator';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Name } from '../../AirlineShared/Validators/Name.validator';

@Component({
  selector: 'app-edit-destinations-modal',
  templateUrl: './edit-destinations-modal.component.html',
  styleUrls: ['./edit-destinations-modal.component.css']
})
export class EditDestinationsModalComponent implements OnInit {

  @Input()
  destinations : string[]

  form : FormGroup
  constructor(private builder : FormBuilder,private activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      destination : ['',[Validators.required,Name,EmptyStringField]]
    })
  }

  RemoveDestination(destination : string){
    this.destinations.splice(this.destinations.indexOf(destination),1);
  }

  OnSubmit(){
    if(this.form.valid){
      this.destinations.push(this.form.value.destination);
      this.form.get('destination').reset()
    }
  }

  Close(){
    this.activeModal.close();
  }
}
