import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AddressPipe } from '../Pipes/Address/address.pipe';
declare var H: any;
@Component({
  selector: 'app-airline-details',
  templateUrl: './airline-details.component.html',
  styleUrls: ['./airline-details.component.css']
})
export class AirlineDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild("map")
  public mapElement: ElementRef;
  rate : number
  role : string;
  @Input()
  item : AirlineCompany
  @Output()
  redirectionHappening : EventEmitter<any>
  constructor() {
  this.redirectionHappening = new EventEmitter()
  this.role = localStorage["Role"]
  }
  ngAfterViewInit(): void {
    let platform = new H.service.Platform({
      'apikey': '_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE'
  });
  let defaultLayers = platform.createDefaultLayers();
  let map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center : {lat:50, lng:5},
        zoom : 15
          
      }
  );

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  map.addObject(new H.map.Marker({lat : this.item.address.latitude, lng : this.item.address.longitude}))
  map.setCenter({lat : this.item.address.latitude, lng : this.item.address.longitude})
  }

  ngOnInit(): void {
    if(this.item.rating){
      this.rate = this.item.rating
    }
    else
      this.rate = 0

  }

  public Redirection(){
    this.redirectionHappening.emit(null);
  }

}
