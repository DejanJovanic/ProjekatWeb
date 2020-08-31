import { Component, OnInit, Input } from '@angular/core';
import { FastFlight } from 'src/app/Shared/Model/Airlines/FastFlight.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fast-flight-panel',
  templateUrl: './fast-flight-panel.component.html',
  styleUrls: ['./fast-flight-panel.component.css']
})
export class FastFlightPanelComponent implements OnInit {

  @Input()
  fastFlight : FastFlight
  
  constructor() { }

  ngOnInit(): void {
  }

}
