import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      enterpriseCountry: new FormControl(this.item.EnterpriseAddress.Country, Validators.required),
      enterpriseCity: new FormControl(this.item.EnterpriseAddress.City, Validators.required),
      enterpriseStreet: new FormControl(this.item.EnterpriseAddress.Street, Validators.required),
      enterpriseStreetNo: new FormControl(this.item.EnterpriseAddress.StreetNo, Validators.required),
      enterpriseZipCode: new FormControl(this.item.EnterpriseAddress.ZipCode, Validators.required),
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
