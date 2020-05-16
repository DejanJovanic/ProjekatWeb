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

    @ViewChild("map")
    public mapElement: ElementRef;

  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
    this.platform = new H.service.Platform({
      'apikey': '_e_CFfK2-tpCb_Yn48j1u9lqkFVBhEOp2Uf2l_0owqE'
  });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["address"];
      this.Address = this.EnterpriseService.getAddress(this.id);
      
      
    });
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
