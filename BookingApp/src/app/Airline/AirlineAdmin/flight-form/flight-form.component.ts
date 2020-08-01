import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StopsModalComponent } from '../stops-modal/stops-modal.component';
import * as moment from 'moment'
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';
import { FlightClass } from 'src/app/Shared/Model/Airlines/FlightClass.model';
import { LoadWeigth } from 'src/app/Shared/Model/Airlines/LoadWeigth.model';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { LoadWeigthComponent } from '../load-weigth/load-weigth.component';
import { ExtrasComponent } from '../extras/extras.component';

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
  const start = fg.get('startDateTime').value;
  const end = fg.get('finishDateTime').value;

  let temp1 = new Date(start).getTime()
  let temp2 = new Date(end).getTime() 
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
  classes : string[] = []
  isRoundTrip : boolean;
  loadWeights : LoadWeigth[] = []
  paidExtras : Extra[] = []

  constructor(private builder : FormBuilder,private cache : AirlineCacheService,
    private modalService : NgbModal) {
    this.destinations1 = cache.airlines.getValue()[0].destinations;
    this.destinations2 = cache.airlines.getValue()[0].destinations;
    this.classes = Object.keys(FlightClass).filter(i => isNaN(Number(i)))

   }

  ngOnInit(): void {
    this.isRoundTrip = this.flight ? this.flight.isRoundTrip : false
    this.flightForm = this.builder.group({
      startLocation : [this.flight ? this.flight.startLocation : this.destinations1[0],Validators.required],
      finishLocation : [this.flight ? this.flight.endLocation : this.destinations2[1],Validators.required],
      isRoundTrip : [this.isRoundTrip],
      startDateTime : [this.flight ? this.flight.startDate : '',Validators.required],
      finishDateTime : [this.flight ? this.flight.endDate : '',Validators.required],
      startDateTimeBack : [ this.flight ? this.flight.startDate : '',Validators.required],
      finishDateTimeBack : [this.flight ? this.flight.endDate : '',Validators.required],
      price : [this.flight ? this.flight.price : '',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      travelDistance : [this.flight ? this.flight.travelDistance : '',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      class : [this.flight ? FlightClass[this.flight.flightClass] : this.classes[0]],
      rows : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      cols : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
      loadInCabin : ['',[Validators.pattern(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/),Validators.required]],
    }, {validators : [this.startFinishLocationsValidator,this.startFinishDatesValidator]})

    this.flightForm.get('isRoundTrip').valueChanges.subscribe(i =>{
      this.isRoundTrip = i;
      if(!i){
        this.flightForm.get('startDateTimeBack').disable()
        this.flightForm.get('finishDateTimeBack').disable()

        
      }
      else{
        this.flightForm.get('startDateTimeBack').enable()
        this.flightForm.get('finishDateTimeBack').enable()
      }
    })
    this.flightForm.get('isRoundTrip').setValue(this.isRoundTrip);
  }

  SetStops(){
    let ref = this.modalService.open(StopsModalComponent)
    ref.componentInstance.availablePlaces = this.destinations1.filter(i => i != this.flightForm.value.startLocation && i != this.flightForm.value.finishLocation)
    ref.componentInstance.selectedPlaces = this.destinationOptions;
  }

  SetLoad(){
    let ref = this.modalService.open(LoadWeigthComponent)
    ref.componentInstance.loadOptions = this.loadWeights;
  }

  SetExtras(){
    let ref = this.modalService.open(ExtrasComponent)
    ref.componentInstance.extras = this.paidExtras
  }

  Submit(){
    if(this.flightForm.valid){
      
      let start = new Date(this.flightForm.value.startDateTime)
      let end = new Date(this.flightForm.value.finishDateTime)
      
      let startBack = undefined;
      let endBack = undefined;
      if(this.flightForm.value.isRoundTrip){
        startBack = new Date(this.flightForm.value.startDateTimeBack)
        endBack = new Date(this.flightForm.value.finishDateTimeBack)
        
      }
      var ms = moment(start).diff(moment(end));
      var d = moment.duration(ms);
      var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

      if(this.flight == null){
        let temp = new Flight(this.cache.airlines.getValue()[0]);
        if(this.flightForm.value.isRoundTrip){
          temp.startDateBack = startBack;
          temp.endDateBack = endBack;
        }
        temp.startDate = start;
        temp.endDate = end;
        temp.startLocation = this.flightForm.value.startLocation;
        temp.endLocation = this.flightForm.value.finishLocation;
        temp.numberOfStops = this.destinationOptions.length;
        temp.stopsLocations = this.destinationOptions;
        temp.extras = this.paidExtras;
        temp.weightPricings = this.loadWeights;
        temp.extras = this.paidExtras;
        temp.distance = +this.flightForm.value.travelDistance;
        temp.isRoundTrip = this.flightForm.value.isRoundTrip;
        temp.price = +this.flightForm.value.price;
        temp.loadInCabin = +this.flightForm.value.loadInCabin;
        temp.airplane = new Airplane();
        temp.airplane.rows = +this.flightForm.value.rows;
        temp.airplane.columns = +this.flightForm.value.cols;
        temp.flightClass = FlightClass[this.flightForm.value.class as keyof typeof FlightClass]
        this.flightEvent.emit(temp);
      }
    }
  }
}
