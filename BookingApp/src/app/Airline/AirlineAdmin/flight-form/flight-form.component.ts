import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StopsModalComponent } from '../stops-modal/stops-modal.component';
import * as moment from 'moment'

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  private startFinishLocationsValidator : ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('startLocation').value;
    const end = fg.get('finishLocation').value;
 
    return start != end ? null : {startEndLocation : true}
 }
 private startFinishDatesValidator : ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('startDate').value;
  const end = fg.get('finishDate').value;
  const startTime = fg.get('startTime').value;
  const endTime = fg.get('finishTime').value;
  let temp1 = new Date(start.year,start.month,start.day,startTime.hour,startTime.minute).getTime()
  let temp2 = new Date(end.year,end.month,end.day,endTime.hour,endTime.minute).getTime() 
  return temp1 < temp2 ? null : {startEndDate : true};
}
  @Input()
  flight : Flight

  @Output()
  flightEvent : EventEmitter<Flight> = new EventEmitter();
  flightForm : FormGroup
  destinations1 : string[]
  destinations2 : string[]
  destinationOptions : string[] = []
  constructor(private builder : FormBuilder,private cache : AirlineCacheService,
    private modalService : NgbModal) {
    this.destinations1 = cache.airlines.getValue()[0].destinations;
    this.destinations2 = cache.airlines.getValue()[0].destinations;
   }

  ngOnInit(): void {
    this.flightForm = this.builder.group({
      startLocation : [this.flight ? this.flight.startLocation : this.destinations1[0],Validators.required],
      finishLocation : [this.flight ? this.flight.finishLocation : this.destinations2[1],Validators.required],
      startDate : [this.flight ? this.flight.startDate : '',Validators.required],
      finishDate : [this.flight ? this.flight.finishDate : '',Validators.required],
      startTime : [this.flight ? this.flight.startDate : {hour : 2,minute : 20},Validators.required],
      finishTime : [this.flight ? this.flight.startDate : {hour : 2,minute : 20},Validators.required],
      price : [this.flight ? this.flight.price : '',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      travelDistance : [this.flight ? this.flight.travelDistance : '',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      isRoundTrip : [this.flight ? this.flight.isRoundTrip : false]
    }, {validators : [this.startFinishLocationsValidator,this.startFinishDatesValidator]})
  }

  SetStops(){
    let ref = this.modalService.open(StopsModalComponent)
    ref.componentInstance.availablePlaces = this.destinations1.filter(i => i != this.flightForm.value.startLocation && i != this.flightForm.value.finishLocation)
    ref.componentInstance.selectedPlaces = this.destinationOptions;
  }

  Submit(){
    if(this.flightForm.valid){
      let start = new Date(this.flightForm.value.startDate.year,this.flightForm.value.startDate.month,
        this.flightForm.value.startDate.day,this.flightForm.value.startTime.hour,this.flightForm.value.startTime.minute)
      let end = new Date(this.flightForm.value.finishDate.year,this.flightForm.value.finishDate.month,
        this.flightForm.value.finishDate.day,this.flightForm.value.finishTime.hour,this.flightForm.value.finishTime.minute)
        
      var ms = moment(start).diff(moment(end));
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

      if(this.flight == null){
        let temp = new Flight(this.cache.airlines.getValue()[0]);
        temp.startDate = start;
        temp.finishDate = end;
        temp.finishLocation = this.flightForm.value.finishLocation;
        temp.numberOfStops = this.destinationOptions.length;
        temp.stopsLocations = this.destinationOptions;
        temp.travelDistance = this.flightForm.value.travelDistance;
        temp.isRoundTrip = this.flightForm.value.isRoundTrip;
        temp.price = this.flightForm.value.price;
        this.flightEvent.emit(temp);
      }
    }
  }
}
