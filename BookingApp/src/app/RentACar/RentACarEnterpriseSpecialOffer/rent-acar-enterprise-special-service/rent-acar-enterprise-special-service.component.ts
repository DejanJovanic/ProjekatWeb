import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { RentACarEditSpecialOffersModalComponent } from '../../RentACarAdmin/rent-acar-edit-special-offers-modal/rent-acar-edit-special-offers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddSpecialOfferModalComponent } from '../../RentACarAdmin/rent-acar-add-special-offer-modal/rent-acar-add-special-offer-modal.component';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
@Component({
  selector: 'app-rent-acar-enterprise-special-service',
  templateUrl: './rent-acar-enterprise-special-service.component.html',
  styleUrls: ['./rent-acar-enterprise-special-service.component.css']
})
export class RentACarEnterpriseSpecialServiceComponent implements OnInit {
  Enterprise: RentACarEnterprise;
  id: number;
  slides: any = [[]];
  role: string;
  constructor(private modalService : NgbModal, private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
    this.role = sessionStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
   
    });

    this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
    this.slides = this.chunk(this.Enterprise.EnterpriseOffers, 3);
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  openSpecialOfferEditModal(offerId: number, enterpriseId: number){
    const modalRef = this.modalService.open(RentACarEditSpecialOffersModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneSpecialOffer(offerId, enterpriseId);
  }

  openSpecialOfferAddModal(enterpriseId: number){
    const modalRef = this.modalService.open(RentACarAddSpecialOfferModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getRentACarEnterprise(enterpriseId);
  }


}
