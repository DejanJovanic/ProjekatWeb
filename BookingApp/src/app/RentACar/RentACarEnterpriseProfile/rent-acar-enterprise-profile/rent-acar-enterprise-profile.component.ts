import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
@Component({
  selector: 'app-rent-acar-enterprise-profile',
  templateUrl: './rent-acar-enterprise-profile.component.html',
  styleUrls: ['./rent-acar-enterprise-profile.component.css']
})
export class RentACarEnterpriseProfileComponent implements OnInit {
  Enterprise: RentACarEnterprise;
  id: number;
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
    });
  }

}
