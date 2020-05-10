import { Component, OnInit } from '@angular/core';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Component({
  selector: 'app-airline-admin-company-preview',
  templateUrl: './airline-admin-company-preview.component.html',
  styleUrls: ['./airline-admin-company-preview.component.css']
})
export class AirlineAdminCompanyPreviewComponent implements OnInit {

  company : AirlineCompany
  constructor(private cache : AirlineCacheService) {
    this.company = this.cache.airlines.getValue()[0];
   }

  ngOnInit(): void {
  }

}
