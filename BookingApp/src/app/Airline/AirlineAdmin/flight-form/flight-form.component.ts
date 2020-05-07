import { Component, OnInit, Input } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StopsModalComponent } from '../stops-modal/stops-modal.component';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  @Input()
  flight? : Flight
  flightForm : FormGroup
  destinations : string[]
  destinationOptions : string[] = []
  constructor(private builder : FormBuilder,private cache : AirlineCacheService,
    private modalService : NgbModal) {
    this.destinations = cache.airlines.getValue()[0].destinations;
   }

  ngOnInit(): void {
    this.flightForm = this.builder.group({
      startLocation : [this.flight ? this.flight.startLocation : this.destinations[0],Validators.required],
      finishLocation : [this.flight ? this.flight.finishLocation : this.destinations[1],Validators.required],
      startDate : [this.flight ? this.flight.startDate : '',Validators.required],
      finishDate : [this.flight ? this.flight.finishDate : '',Validators.required],
      startTime : [this.flight ? this.flight.startDate : {hour : 2,minute : 20},Validators.required],
      finishTime : [this.flight ? this.flight.startDate : {hour : 2,minute : 20},Validators.required],
      price : [this.flight ? this.flight.price : '',Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
      travelDistance : [this.flight ? this.flight.travelDistance : '',Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/)],
      isRoundTrip : [this.flight ? this.flight.isRoundTrip : false]
    })
  }

  SetStops(){
    let ref = this.modalService.open(StopsModalComponent)
    ref.componentInstance.availablePlaces = this.destinations.filter(i => i != this.flightForm.value.startLocation && i != this.flightForm.value.finishLocation)
    ref.componentInstance.selectedPlaces = this.destinationOptions;
  }

  Submit(){
    let value = this.flightForm.value;
    let startTime = this.flightForm.value.startTime
    let finishTime = this.flightForm.value.finishTime
    let travelTime = {hour : 0, minute : 0}
    if(startTime.minute > finishTime.minute){
      
    }
  }

}
