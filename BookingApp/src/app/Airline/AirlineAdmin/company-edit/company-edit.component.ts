import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditDestinationsModalComponent } from '../edit-destinations-modal/edit-destinations-modal.component';
import { AirlineAddress } from 'src/app/Shared/Model/Airlines/AirlineAddress.model';
import { AirlineAdminDataService } from '../Services/AirlineAdminData/airline-admin-data.service';
import { Router } from '@angular/router';
import { Name } from '../../AirlineShared/Validators/Name.validator';
import { WholeNumber } from '../../AirlineShared/Validators/WholeNumber.validator';
import { ToastrService } from 'ngx-toastr';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  customErrors = {
    pattern :  'Number is invalid'
  }
  company : AirlineCompany;
  companyForm : FormGroup
  destinations: string[]
  constructor(private builder : FormBuilder,private cache: AirlineCacheService,private toast : ToastrService,
    private modalService : NgbModal,private background : BackgroundService,private service : AirlineAdminDataService,private router : Router) {
    this.company = this.cache.airlines.getValue()[0];
    if(!this.company.name || this.company.description == undefined)
      this.company.name = ""
    if(!this.company.description || this.company.description == undefined)
      this.company.description = ""
    
    if(!this.company.address || this.company.address == undefined)
      this.company.address = new AirlineAddress();
      
    if(!this.company.address.city || this.company.address == undefined)
      this.company.address.city = ""
    
    if(!this.company.address.country || this.company.address.country == undefined)
      this.company.address.country = ""

    if(!this.company.address.street || this.company.address.street == undefined)
      this.company.address.street = ""

    if(!this.company.address.zipCode || this.company.address.zipCode == undefined)
      this.company.address.zipCode = ""
    
    if(!this.company.address.streetNo || this.company.address.streetNo == undefined)
      this.company.address.streetNo = "";
    if(!this.company.destinations || this.company.destinations == undefined)
      this.company.destinations = [];
        
    this.destinations = this.company.destinations;

   }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.FlightEdit);
  });
    this.companyForm = this.builder.group({
      name : [this.company.name,[Validators.required,Name]],
      description : [this.company.description,[Validators.required]],
      street : [this.company.address.street,[Validators.required,Name]],
      streetNo : [this.company.address.streetNo,[Validators.required,Validators.pattern(/^[0-9]+\/?[0-9]+[a-zA-Z]{0,3}$/)]],
      city : [this.company.address.city,[Validators.required,Name]],
      zipCode : [this.company.address.zipCode,[Validators.required,WholeNumber]],
      country: [this.company.address.country,[Validators.required,Name]]
    })
  }

  EditDestinations(){
    let ref = this.modalService.open(EditDestinationsModalComponent)
    ref.componentInstance.destinations = this.destinations;
  }

  OnSubmit(){
    if(this.companyForm.valid && this.destinations.length > 2){
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
      temp.address.streetNo = this.companyForm.value.streetNo
      this.service.EditCompanyData(temp).subscribe(i =>{
        if(i){
          this.toast.success('Company details successfully changed')
          this.router.navigate(['main/CompanyPreview']);
        }
      });
     
    }
  }

}
