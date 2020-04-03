import { Component, OnInit } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Component({
  selector: 'app-airline-holder',
  templateUrl: './airline-holder.component.html',
  styleUrls: ['./airline-holder.component.css']
})
export class AirlineHolderComponent implements OnInit {

  private companies : Array<AirlineCompany>;
  constructor() { }

  ngOnInit(): void {
  }

}
