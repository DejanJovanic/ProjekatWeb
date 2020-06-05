import { Component, OnInit, Input } from '@angular/core';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEditSpecialOffersModalComponent } from '../RentACarAdmin/rent-acar-edit-special-offers-modal/rent-acar-edit-special-offers-modal.component';

@Component({
  selector: 'app-rent-acar-special-offer-details-modal',
  templateUrl: './rent-acar-special-offer-details-modal.component.html',
  styleUrls: ['./rent-acar-special-offer-details-modal.component.css']
})
export class RentACarSpecialOfferDetailsModalComponent implements OnInit {
  @Input()
  item : SpecialOffer
  role: string;
  constructor(public activeModal : NgbActiveModal, private modalService : NgbModal,private EnterpriseService: RentACarEnterpriseServiceService) {
    this.role = sessionStorage["Role"]
   }

  ngOnInit(): void {
  }

  
  openSpecialOfferEditModal(offerId: number){
    const modalRef = this.modalService.open(RentACarEditSpecialOffersModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneSpecialOffer(offerId);
  }

}
