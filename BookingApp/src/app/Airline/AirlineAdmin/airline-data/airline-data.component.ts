import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AirlineDataService } from '../Services/AirlineData/airline-data.service';
import { TicketDataResource } from 'src/app/Shared/Model/Airlines/TicketDataResource.model';

@Component({
  selector: 'app-airline-data',
  templateUrl: './airline-data.component.html',
  styleUrls: ['./airline-data.component.css']
})
export class AirlineDataComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {

  }

}
