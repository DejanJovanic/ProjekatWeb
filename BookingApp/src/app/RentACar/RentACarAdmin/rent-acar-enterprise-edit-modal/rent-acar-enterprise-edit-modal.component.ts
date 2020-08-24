import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-rent-acar-enterprise-edit-modal',
  templateUrl: './rent-acar-enterprise-edit-modal.component.html',
  styleUrls: ['./rent-acar-enterprise-edit-modal.component.css']
})
export class RentACarEnterpriseEditModalComponent implements OnInit {
  
  alert: boolean = false;
  editEnterpriseInfoForm: FormGroup;
  @Input()
  item : RentACarEnterprise
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.editEnterpriseInfoForm = new FormGroup({
      enterpriseName: new FormControl(this.item.EnterpriseName, Validators.required),
      enterpriseCountry: new FormControl(this.item.EnterpriseAddress.Country, [Validators.required, this.lettersValidator]),
      enterpriseCity: new FormControl(this.item.EnterpriseAddress.City, [Validators.required, this.lettersValidator] ),
      enterpriseStreet: new FormControl(this.item.EnterpriseAddress.Street, [Validators.required, this.lettersAndNumbers]),
      enterpriseStreetNo: new FormControl(this.item.EnterpriseAddress.StreetNo, [Validators.required, this.lettersAndNumbers]),
      enterpriseZipCode: new FormControl(this.item.EnterpriseAddress.ZipCode, [Validators.required, this.numbersValidator]),
      enterpriseDescription: new FormControl(this.item.EnterpriseDescription, Validators.required)
    });
  }

  editProfile(){
    
    this.item.EnterpriseName = this.editEnterpriseInfoForm.value.enterpriseName;
    this.item.EnterpriseAddress.Country = this.editEnterpriseInfoForm.value.enterpriseCountry;
    this.item.EnterpriseAddress.City = this.editEnterpriseInfoForm.value.enterpriseCity;
    this.item.EnterpriseAddress.Street = this.editEnterpriseInfoForm.value.enterpriseStreet;
    this.item.EnterpriseAddress.StreetNo = this.editEnterpriseInfoForm.value.enterpriseStreetNo;
    this.item.EnterpriseAddress.ZipCode = this.editEnterpriseInfoForm.value.enterpriseZipCode;
    this.item.EnterpriseDescription = this.editEnterpriseInfoForm.value.enterpriseDescription;

    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

  lettersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
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

  lettersAndNumbers(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^(?:[A-Za-z]*)(?:[A-Za-z0-9 _]*)$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
   
  }
}
