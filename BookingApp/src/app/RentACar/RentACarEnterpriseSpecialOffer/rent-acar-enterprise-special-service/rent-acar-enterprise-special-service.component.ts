import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
@Component({
  selector: 'app-rent-acar-enterprise-special-service',
  templateUrl: './rent-acar-enterprise-special-service.component.html',
  styleUrls: ['./rent-acar-enterprise-special-service.component.css']
})
export class RentACarEnterpriseSpecialServiceComponent implements OnInit {
  Enterprise: RentACarEnterprise;
  id: number;
  slides: any = [[]];
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);

      this.slides = this.chunk(this.Enterprise.EnterpriseOffers, 3);
    });
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
