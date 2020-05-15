import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { ActivatedRoute } from '@angular/router';

declare var H: any;
@Component({
  selector: 'app-rent-acar-enterprise-location-on-map',
  templateUrl: './rent-acar-enterprise-location-on-map.component.html',
  styleUrls: ['./rent-acar-enterprise-location-on-map.component.css']
})
export class RentACarEnterpriseLocationOnMapComponent implements OnInit {

  private platform: any;

    @ViewChild("map")
    public mapElement: ElementRef;

  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
    this.platform = new H.service.Platform({
      "app_id": "EN0ay4qsFZfJrIR5xbZm",
      "app_code": "YqkUCyFGBCRJJrepqBzaCTRxzyl-S5I_sNIdR_ec5jA"
  });
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
            zoom: 10,
            center: { lat: 37.7397, lng: -121.4252 }
        }
    );
}

}
