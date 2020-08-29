import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
import { ValidationService } from '../../Services/ValidationService/validation.service';
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
  constructor(private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.editEnterpriseSpecialOffer = new FormGroup({
      specialOfferName: new FormControl(this.item.OfferName, Validators.required),
      specialOfferPrice: new FormControl(this.item.OfferDiscount, [Validators.required, this.service.numbersValidator, this.service.percentageValidator]),
      specialOfferDescription: new FormControl(this.item.OfferDescription, Validators.required),
      specialOfferNumberOfDays: new FormControl(this.item.NumberOfDays, [Validators.required, this.service.numbersValidator])
    });
  }

  editOffer(){
    
    this.item.OfferName = this.editEnterpriseSpecialOffer.value.specialOfferName;
    this.item.OfferDiscount = this.editEnterpriseSpecialOffer.value.specialOfferPrice;
    

    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

  

}
