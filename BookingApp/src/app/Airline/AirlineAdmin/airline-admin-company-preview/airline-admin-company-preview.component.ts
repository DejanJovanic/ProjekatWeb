import { Component, OnInit } from '@angular/core';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

@Component({
  selector: 'app-airline-admin-company-preview',
  templateUrl: './airline-admin-company-preview.component.html',
  styleUrls: ['./airline-admin-company-preview.component.css']
})
export class AirlineAdminCompanyPreviewComponent implements OnInit {

  company : AirlineCompany
  constructor(private cache : AirlineCacheService,private background : BackgroundService) {
    this.company = this.cache.airlines.getValue()[0];
   }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.AirlineAdminMain);
  });
  }

}
