import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';
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
  constructor(private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.editEnterpriseInfoForm = new FormGroup({
      enterpriseName: new FormControl(this.item.EnterpriseName, Validators.required),
      enterpriseCountry: new FormControl(this.item.EnterpriseAddress.Country, [Validators.required, this.service.lettersValidator]),
      enterpriseCity: new FormControl(this.item.EnterpriseAddress.City, [Validators.required, this.service.lettersValidator] ),
      enterpriseStreet: new FormControl(this.item.EnterpriseAddress.Street, [Validators.required, this.service.lettersAndNumbers]),
      enterpriseStreetNo: new FormControl(this.item.EnterpriseAddress.StreetNo, [Validators.required, this.service.lettersAndNumbers]),
      enterpriseZipCode: new FormControl(this.item.EnterpriseAddress.ZipCode, [Validators.required, this.service.numbersValidator]),
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

}
