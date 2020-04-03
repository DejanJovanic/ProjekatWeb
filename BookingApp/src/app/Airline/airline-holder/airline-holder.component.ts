import { Component, OnInit } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { AirlineGetterService } from '../Services/AirlineGetter/airline-getter.service';
import { range } from 'rxjs';


@Component({
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css'],
  providers: [AirlineGetterService]
})
export class AirlineHolderComponent implements OnInit {

  companies : Array<AirlineCompany>;

  constructor(private service: AirlineGetterService) {}

  ngOnInit(): void {
    this.companies = this.service.GetAirlineCompanies();
  }

}
