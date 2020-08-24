import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';

@Component({
  selector: 'app-rent-acar-add-special-offer-modal',
  templateUrl: './rent-acar-add-special-offer-modal.component.html',
  styleUrls: ['./rent-acar-add-special-offer-modal.component.css']
})
export class RentACarAddSpecialOfferModalComponent implements OnInit {

  alert: boolean = false;
  addEnterpriseSpecialOffer: FormGroup;
  id: number;
  obj: SpecialOffer;
   @Input()
  item : RentACarEnterprise
  constructor(public activeModal : NgbActiveModal, private EnterpriseService: RentACarEnterpriseServiceService) { }

  ngOnInit(): void {
   
    this.setForm();
  }

  setForm(){
   
    this.addEnterpriseSpecialOffer = new FormGroup({
      specialOfferName: new FormControl('', Validators.required),
      specialOfferPrice: new FormControl('', [Validators.required, this.numbersValidator])
    });
  }

  addOffer(){
    
    var OfferName = this.addEnterpriseSpecialOffer.value.specialOfferName;
    var OfferPrice = this.addEnterpriseSpecialOffer.value.specialOfferPrice;
    
    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

  numbersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[0-9]*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

}
