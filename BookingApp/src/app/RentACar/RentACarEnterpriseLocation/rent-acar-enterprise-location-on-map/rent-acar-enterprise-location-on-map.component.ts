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
      'apikey': '_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE'
  });
  }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    let defaultLayers = this.platform.createDefaultLayers();
    let map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.vector.normal.map,
        {
            zoom: 10,
            center: { lat: 37.7397, lng: -121.4252 }
        }
    );
}

}
