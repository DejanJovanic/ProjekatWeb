import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-rent-acar-enterprise-all-cars',
  templateUrl: './rent-acar-enterprise-all-cars.component.html',
  styleUrls: ['./rent-acar-enterprise-all-cars.component.css']
})
export class RentACarEnterpriseAllCarsComponent implements OnInit {
 
  Enterprise: RentACarEnterprise;
  id: number;
  RentACarSearchedCars: Car[] = [];
  
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { }
  

  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
     
      this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
    });
  }


}
