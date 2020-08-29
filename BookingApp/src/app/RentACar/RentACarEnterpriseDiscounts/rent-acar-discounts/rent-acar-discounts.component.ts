import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-acar-discounts',
  templateUrl: './rent-acar-discounts.component.html',
  styleUrls: ['./rent-acar-discounts.component.css']
})
export class RentACarDiscountsComponent implements OnInit {

  id: number;
  Enterprise: RentACarEnterprise;
  slides: any = [[]];
  carsOnDiscount: Car[] = [];

  constructor(private routeService: Router, private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal) { }

  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
     
      setTimeout(() => {
        this.routeService.navigate(['/EnterpriseProfile/', this.id]);
    }, 5000);  //5s
      
    });

    var today = new Date();
    
    var d1 = today.toDateString();
   
    for(let i: number = 0; i < this.Enterprise.EnterpriseCars.length; i++){
      if((Date.parse(d1) >= Date.parse(this.Enterprise.EnterpriseCars[i].CarDiscountDateFrom)) && (Date.parse(d1) <= Date.parse(this.Enterprise.EnterpriseCars[i].CarDiscountDateTo)) ){
       
        this.carsOnDiscount.push(this.Enterprise.EnterpriseCars[i]);
      }
    }
    this.slides = this.chunk(this.carsOnDiscount, 3);
  }

  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  openCarDetailsModal(carId: number){
    const modalRef = this.modalService.open(RentACarDetailsModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneCar(carId);
  }

}
