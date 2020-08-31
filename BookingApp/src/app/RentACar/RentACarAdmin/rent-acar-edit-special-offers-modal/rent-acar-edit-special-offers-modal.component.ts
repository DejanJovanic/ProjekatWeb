import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/Models/SpecialOffer.model';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { EditSpecialOfferParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditSpecialOfferParameters.model';
import { SpecialOfferService } from '../../Services/SpecialOfferService/special-offer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rent-acar-edit-special-offers-modal',
  templateUrl: './rent-acar-edit-special-offers-modal.component.html',
  styleUrls: ['./rent-acar-edit-special-offers-modal.component.css']
})
export class RentACarEditSpecialOffersModalComponent implements OnInit {


  editEnterpriseSpecialOffer: FormGroup;
  offer;
  @Input()
  item : SpecialOffer
  constructor(private routeService: Router, private toaster: ToastrService,private specialOfferService: SpecialOfferService, private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.editEnterpriseSpecialOffer = new FormGroup({
      specialOfferName: new FormControl(this.item.name, Validators.required),
      specialOfferPrice: new FormControl(this.item.discount, [Validators.required, this.service.numbersValidator, this.service.percentageValidator]),
      specialOfferDescription: new FormControl(this.item.description, Validators.required),
      specialOfferNumberOfDays: new FormControl(this.item.numberOfDays, [Validators.required, this.service.numbersValidator])
    });
  }

  editOffer(){
   
    var parameters = new EditSpecialOfferParameters();
    parameters.name = this.editEnterpriseSpecialOffer.value.specialOfferName;
    parameters.discount = this.editEnterpriseSpecialOffer.value.specialOfferPrice;
    parameters.enterpriseId = this.item.enterpriseId;
    parameters.specialOfferId = this.item.id;
    parameters.description = this.editEnterpriseSpecialOffer.value.specialOfferDescription;
    parameters.numberOfDays = this.editEnterpriseSpecialOffer.value.specialOfferNumberOfDays;
    parameters.numberOfDays = parameters.numberOfDays.toString();
    parameters.discount = parameters.discount.toString();
    console.log(parameters);
    this.specialOfferService.editSpecialOffer(parameters).subscribe(i =>{
        this.offer = i;
        this.toaster.success("Edit operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Edit special offer',{
          timeOut : 2000
        })

        setTimeout(() => {
          this.routeService.navigate(['RentACarEnterpriseAdmin']);
      }, 3000); 
        this.activeModal.close();
    })


  }

 

  

}
