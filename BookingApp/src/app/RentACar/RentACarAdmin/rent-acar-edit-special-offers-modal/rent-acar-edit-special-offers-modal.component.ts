import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/Models/SpecialOffer.model';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { EditSpecialOfferParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditSpecialOfferParameters.model';
import { SpecialOfferService } from '../../Services/SpecialOfferService/special-offer.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rent-acar-edit-special-offers-modal',
  templateUrl: './rent-acar-edit-special-offers-modal.component.html',
  styleUrls: ['./rent-acar-edit-special-offers-modal.component.css']
})
export class RentACarEditSpecialOffersModalComponent implements OnInit {

  alert: boolean = false;
  editEnterpriseSpecialOffer: FormGroup;
  offer;
  @Input()
  item : SpecialOffer
  constructor(private toaster: ToastrService,private specialOfferService: SpecialOfferService, private service: ValidationService, public activeModal : NgbActiveModal) { }

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
    parameters.discountPercentage = this.editEnterpriseSpecialOffer.value.specialOfferPrice;
    parameters.enterpriseId = this.item.enterpriseId;
    parameters.specialOfferId = this.item.id;
    parameters.description = this.editEnterpriseSpecialOffer.value.specialOfferDescription;
    parameters.numberOfDays = this.editEnterpriseSpecialOffer.value.specialOfferNumberOfDays;
   
    this.specialOfferService.addSpecialOffer(parameters).subscribe(i =>{
        this.offer = i;
        this.toaster.success("Edit special offer has been successfully executed",'Edit special offer',{
          timeOut : 3000
        })
    })


  }

 

  

}
