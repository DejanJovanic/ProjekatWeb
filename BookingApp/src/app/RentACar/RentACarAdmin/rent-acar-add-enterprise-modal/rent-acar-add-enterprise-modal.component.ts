import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { EditEnterpriseParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditEnterpriseParameters.model';

@Component({
  selector: 'app-rent-acar-add-enterprise-modal',
  templateUrl: './rent-acar-add-enterprise-modal.component.html',
  styleUrls: ['./rent-acar-add-enterprise-modal.component.css']
})
export class RentACarAddEnterpriseModalComponent implements OnInit {
 
  return;
  addEnterpriseForm: FormGroup;
  constructor(private routeService: Router, private toaster: ToastrService,private enterpriseService: EnterpriseService, private service: ValidationService,public activeModal : NgbActiveModal, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.setForm();
   
    
  }

  setForm(){
   
    this.addEnterpriseForm = new FormGroup({
      enterpriseName: new FormControl('', Validators.required),
      enterpriseCountry: new FormControl('', [Validators.required, this.service.lettersValidator]),
      enterpriseCity: new FormControl('', [Validators.required, this.service.lettersValidator] ),
      enterpriseStreet: new FormControl('', Validators.required),
      enterpriseStreetNo: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      enterpriseZipCode: new FormControl('', [Validators.required, this.service.numbersValidator]),
      enterpriseDescription: new FormControl('', Validators.required)
    });
  }

  addEnterprise(){
    var parameters = new EditEnterpriseParameters();
    
   
    parameters.description = this.addEnterpriseForm.value.enterpriseDescription;
    parameters.name = this.addEnterpriseForm.value.enterpriseName;
    parameters.address.city = this.addEnterpriseForm.value.enterpriseCity;
    parameters.address.country =  this.addEnterpriseForm.value.enterpriseCountry;
    parameters.address.street = this.addEnterpriseForm.value.enterpriseStreet;
    parameters.address.streetNo =  this.addEnterpriseForm.value.enterpriseStreetNo;
    parameters.address.zipCode = this.addEnterpriseForm.value.enterpriseZipCode;
    
    this.enterpriseService.addEnterprise(parameters).subscribe(i =>{
      this.return = i;
      this.toaster.success("Add operation has been successfully executed.",'Add enterprise',{
        timeOut : 2000
      })

     
      this.activeModal.close();
    })
  }

}
