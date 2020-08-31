import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { EditEnterpriseParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditEnterpriseParameters.model';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rent-acar-enterprise-edit-modal',
  templateUrl: './rent-acar-enterprise-edit-modal.component.html',
  styleUrls: ['./rent-acar-enterprise-edit-modal.component.css']
})
export class RentACarEnterpriseEditModalComponent implements OnInit {
  
  Enterprise;
  return;
  editEnterpriseInfoForm: FormGroup;
  @Input()
  item : Enterprise
  constructor(private routeService: Router, private toaster: ToastrService,private enterpriseService: EnterpriseService, private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
   
    
  }

  setForm(){
   
    this.editEnterpriseInfoForm = new FormGroup({
      enterpriseName: new FormControl(this.item.name, Validators.required),
      enterpriseCountry: new FormControl(this.item.address.country, [Validators.required, this.service.lettersValidator]),
      enterpriseCity: new FormControl(this.item.address.city, [Validators.required, this.service.lettersValidator] ),
      enterpriseStreet: new FormControl(this.item.address.street, Validators.required),
      enterpriseStreetNo: new FormControl(this.item.address.streetNo, [Validators.required, this.service.lettersAndNumbers]),
      enterpriseZipCode: new FormControl(this.item.address.zipCode, [Validators.required, this.service.numbersValidator]),
      enterpriseDescription: new FormControl(this.item.description, Validators.required)
    });
  }

  editProfile(){
    

    var parameters = new EditEnterpriseParameters();
    
    parameters.enterpriseId = this.item.id;
    parameters.description = this.editEnterpriseInfoForm.value.enterpriseDescription;
    parameters.name = this.editEnterpriseInfoForm.value.enterpriseName;
    parameters.address.city = this.editEnterpriseInfoForm.value.enterpriseCity;
    parameters.address.country =  this.editEnterpriseInfoForm.value.enterpriseCountry;
    parameters.address.street = this.editEnterpriseInfoForm.value.enterpriseStreet;
    parameters.address.streetNo =  this.editEnterpriseInfoForm.value.enterpriseStreetNo;
    parameters.address.zipCode = this.editEnterpriseInfoForm.value.enterpriseZipCode;
    
    this.enterpriseService.editEnterpriseProfile(parameters).subscribe(i =>{
      this.return = i;
      this.toaster.success("Edit operation has been successfully executed.",'Edit profile',{
        timeOut : 2000
      })

     
      this.activeModal.close();
    })
  }

 

}
