import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
@Component({
  selector: 'app-rent-acar-edit-special-offers-modal',
  templateUrl: './rent-acar-edit-special-offers-modal.component.html',
  styleUrls: ['./rent-acar-edit-special-offers-modal.component.css']
})
export class RentACarEditSpecialOffersModalComponent implements OnInit {

  alert: boolean = false;
  editEnterpriseSpecialOffer: FormGroup;
  @Input()
  item : SpecialOffer
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.editEnterpriseSpecialOffer = new FormGroup({
      specialOfferName: new FormControl(this.item.OfferName, Validators.required),
      specialOfferPrice: new FormControl(this.item.OfferPrice, Validators.required)
    });
  }

  editOffer(){
    
    this.item.OfferName = this.editEnterpriseSpecialOffer.value.specialOfferName;
    this.item.OfferPrice = this.editEnterpriseSpecialOffer.value.specialOfferPrice;
    

    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

}