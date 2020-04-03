import { Component, OnInit, Input } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';

@Component({
  selector: 'app-airline-panel',
  templateUrl: './airline-panel.component.html',
  styleUrls: ['./airline-panel.component.css']
})
export class AirlinePanelComponent implements OnInit {

  @Input() 
  item : AirlineCompany
  
  constructor() { }

  ngOnInit(): void {
  }

}
