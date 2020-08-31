import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { RentACarEditSpecialOffersModalComponent } from '../../RentACarAdmin/rent-acar-edit-special-offers-modal/rent-acar-edit-special-offers-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddSpecialOfferModalComponent } from '../../RentACarAdmin/rent-acar-add-special-offer-modal/rent-acar-add-special-offer-modal.component';

import { RentACarSpecialOfferDetailsModalComponent } from '../../rent-acar-special-offer-details-modal/rent-acar-special-offer-details-modal.component';
import { SpecialOfferService } from '../../Services/SpecialOfferService/special-offer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rent-acar-enterprise-special-service',
  templateUrl: './rent-acar-enterprise-special-service.component.html',
  styleUrls: ['./rent-acar-enterprise-special-service.component.css']
})
export class RentACarEnterpriseSpecialServiceComponent implements OnInit {
  SpecialOffers;
  SpecialOffer;
  id: number;
  slides: any = [[]];
  role: string;
  constructor(private specialOfferService: SpecialOfferService, private toaster: ToastrService, private modalService : NgbModal, private route: ActivatedRoute) { 
    this.role = localStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
   
    });
    this.specialOfferService.getAllSpecialOffers(this.id).subscribe(i =>{
      this.SpecialOffers = i;
      this.slides = this.chunk(this.SpecialOffers, 3);
      this.toaster.success("Your request has been successfully executed.",'Special offers',{
        timeOut : 3000
      })
    })
    
    
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


  openSpecialOfferAddModal(){
    const modalRef = this.modalService.open(RentACarAddSpecialOfferModalComponent);
    modalRef.componentInstance.item = this.id;
  }

  openSpecialOfferDetails(specialOfferId: number){
    this.specialOfferService.getOneSpecialOffer(this.id, specialOfferId).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarSpecialOfferDetailsModalComponent);
      this.SpecialOffer = i;
      this.toaster.success("Your request has been successfully executed",'Special offer details',{
        timeOut : 3000
      })
      this.SpecialOffer.enterpriseId = this.id;
      
      modalRef.componentInstance.item = this.SpecialOffer;
    })
    
  }


}
