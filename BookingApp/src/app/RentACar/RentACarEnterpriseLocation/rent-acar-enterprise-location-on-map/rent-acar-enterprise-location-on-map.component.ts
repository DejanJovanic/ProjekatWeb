import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarEnterpriseAddress } from 'src/app/Shared/Model/RentACars/RentACarEnterpriseAddress.model';

declare var H: any;
@Component({
  selector: 'app-rent-acar-enterprise-location-on-map',
  templateUrl: './rent-acar-enterprise-location-on-map.component.html',
  styleUrls: ['./rent-acar-enterprise-location-on-map.component.css']
})
export class RentACarEnterpriseLocationOnMapComponent implements OnInit {

  id: number
  Address: RentACarEnterpriseAddress
  private platform: any;
  geocoder: any;
  query: string;
  

    @ViewChild("map")
    public mapElement: ElementRef;

  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
     this.platform = new H.service.Platform({
      'apikey': '_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE'
  });
  this.geocoder = this.platform.getSearchService();
  
  }

  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Address = this.EnterpriseService.getAddress(this.id);
      
      
      this.query = this.Address.Street + " " + this.Address.StreetNo + ", " + this.Address.ZipCode + " " + this.Address.City + ", " + this.Address.Country;
     
    });
  }

  public ngAfterViewInit() {
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
}

  

}
