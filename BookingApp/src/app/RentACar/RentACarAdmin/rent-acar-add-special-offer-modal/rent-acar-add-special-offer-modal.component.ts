import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/SpecialOffer.model';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { SpecialOfferService } from '../../Services/SpecialOfferService/special-offer.service';
import { AddSpecialOfferParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddSpecialOfferParameters.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rent-acar-add-special-offer-modal',
  templateUrl: './rent-acar-add-special-offer-modal.component.html',
  styleUrls: ['./rent-acar-add-special-offer-modal.component.css']
})
export class RentACarAddSpecialOfferModalComponent implements OnInit {

  alert: boolean = false;
  addEnterpriseSpecialOffer: FormGroup;
  
  offer;
   @Input()
   id : number
  constructor(private toaster: ToastrService,private service: ValidationService, public activeModal : NgbActiveModal, private specialOfferService: SpecialOfferService) { }

  ngOnInit(): void {
   
    this.setForm();
  }

  setForm(){
   
    this.addEnterpriseSpecialOffer = new FormGroup({
      specialOfferName: new FormControl('', Validators.required),
      specialOfferPrice: new FormControl('', [Validators.required, this.service.numbersValidator, this.service.percentageValidator]),
      specialOfferDescription: new FormControl('', Validators.required),
      specialOfferNumberOfDays: new FormControl('', [Validators.required, this.service.numbersValidator])
    });
  }

  addOffer(){
    
  
    var parameters = new AddSpecialOfferParameters();
    parameters.name = this.addEnterpriseSpecialOffer.value.specialOfferName;
    parameters.discountPercentage = this.addEnterpriseSpecialOffer.value.specialOfferPrice;
    parameters.enterpriseId = this.id;
    parameters.description = this.addEnterpriseSpecialOffer.value.specialOfferDescription;
    parameters.numberOfDays = this.addEnterpriseSpecialOffer.value.specialOfferNumberOfDays;
   
    this.specialOfferService.addSpecialOffer(parameters).subscribe(i =>{
        this.offer = i;
        this.toaster.success("Add special offer has been successfully executed",'Add a special offer',{
          timeOut : 3000
        })
    })
  }

 

  

}
