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
  EnterpriseRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  address: string;
  role: string;
  constructor( private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
    this.role = localStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];

    });
    
    this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
    this.address = this.Enterprise.EnterpriseAddress.Street + " " + this.Enterprise.EnterpriseAddress.StreetNo + ", " + this.Enterprise.EnterpriseAddress.ZipCode + " " + this.Enterprise.EnterpriseAddress.City + ", " + this.Enterprise.EnterpriseAddress.Country;
    this.updateStars();
    this.getArrayValues(0);
    
  }
  updateStars() {
    this.isHalf = this.Enterprise.EnterpriseRating %1 !== 0? true : false;
    for(let i=0; i<this.Enterprise.EnterpriseRating;i++){
      this.EnterpriseRatingArr.push(i)
    }
   
  }
 getArrayValues(index) {
    setInterval(() => {
      if(index == this.EnterpriseRatingArr.length)
        return;
      this.animeArr.push(this.EnterpriseRatingArr[index]);
      index++;
    }, 50);
  }

 
}
