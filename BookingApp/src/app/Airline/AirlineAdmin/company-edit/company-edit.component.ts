import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDestinationsModalComponent } from '../edit-destinations-modal/edit-destinations-modal.component';
import { AirlineAddress } from 'src/app/Shared/Model/Airlines/AirlineAddress.model';
import { AirlineAdminDataService } from '../Services/AirlineAdminData/airline-admin-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company : AirlineCompany;
  companyForm : FormGroup
  destinations: string[]
  constructor(private builder : FormBuilder,private cache: AirlineCacheService,
    private modalService : NgbModal,private service : AirlineAdminDataService,private router : Router) {
    this.company = this.cache.airlines.getValue()[0];
    this.destinations = this.company.destinations;
   }

  ngOnInit(): void {
    this.companyForm = this.builder.group({
      name : [this.company.name,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      description : [this.company.description,[Validators.required]],
      street : [this.company.address.street,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      streetNo : [this.company.address.streetNo,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      city : [this.company.address.city,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      zipCode : [this.company.address.zipCode,[Validators.required]],
      country: [this.company.address.country,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]]
    })
  }

  EditDestinations(){
    let ref = this.modalService.open(EditDestinationsModalComponent)
    ref.componentInstance.destinations = this.destinations;
  }

  OnSubmit(){
    if(this.companyForm.valid){
      let temp = new AirlineCompany()
      temp.id = this.company.id;
      temp.name = this.companyForm.value.name;
      temp.description = this.companyForm.value.description;
      temp.destinations = this.destinations;
      temp.address = new AirlineAddress();
      temp.address.city= this.companyForm.value.city;
      temp.address.country = this.companyForm.value.country;
      temp.address.street = this.companyForm.value.street;
      temp.address.zipCode = this.companyForm.value.zipCode;
      temp.address.streetNo = +this.companyForm.value.streetNo
      this.service.EditCompanyData(temp);
      this.router.navigate(['main/AirlineAdmin']);
    }
  }

}
