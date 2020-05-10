import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company : AirlineCompany;
  companyForm : FormGroup

  constructor(private builder : FormBuilder,private cache: AirlineCacheService) {
    this.company = this.cache.airlines.getValue()[0];
   }

  ngOnInit(): void {
    this.companyForm = this.builder.group({
      name : [this.company.name,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      description : [this.company.description,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      street : [this.company.address.street,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      streetNo : [this.company.address.streetNo,[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      city : [this.company.address.city,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]],
      zipCode : [this.company.address.zipCode,[Validators.required]],
      country: [this.company.address.country,[Validators.required,Validators.pattern(/^[a-zA-Z-]+?$/)]]
    })
  }

}
