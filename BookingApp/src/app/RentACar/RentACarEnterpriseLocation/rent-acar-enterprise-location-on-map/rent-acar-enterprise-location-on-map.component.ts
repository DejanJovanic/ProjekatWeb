import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarEnterpriseAddress } from 'src/app/Shared/Model/RentACars/RentACarEnterpriseAddress.model';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';

declare var H: any;
@Component({
  selector: 'app-rent-acar-enterprise-location-on-map',
  templateUrl: './rent-acar-enterprise-location-on-map.component.html',
  styleUrls: ['./rent-acar-enterprise-location-on-map.component.css']
})
export class RentACarEnterpriseLocationOnMapComponent implements OnInit {

  id: number
  Address;
  private platform: any;
  geocoder: any;
  query: string;
  

    @ViewChild("map")
    public mapElement: ElementRef;

  constructor(private enterpriseService: EnterpriseService, private route: ActivatedRoute) { 
     this.platform = new H.service.Platform({
      'apikey': '_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE'
  });
  this.geocoder = this.platform.getSearchService();
  
  }

  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
     
     
    });

    this.enterpriseService.getEnterpriseLocationOnMap(this.id).subscribe(i =>{
      this.Address = i;
          
    this.query = this.Address.street + " " + this.Address.streetNo + ", " + this.Address.zipCode + " " + this.Address.city + ", " + this.Address.country;
    
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.vector.normal.map,
        {
            zoom: 2
        }
    );

    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    this.geocoder.geocode({
      q: this.query
    }, (result) => {
      
        map.addObject(new H.map.Marker( result.items[0].position));
      
    }, alert);
  })
    
      
  
  }

  
}
