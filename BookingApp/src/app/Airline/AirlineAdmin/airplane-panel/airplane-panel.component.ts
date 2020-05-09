import { Component, OnInit, Input } from '@angular/core';
import { Airplane } from 'src/app/Shared/Model/Airlines/Airplane.model';

@Component({
  selector: 'app-airplane-panel',
  templateUrl: './airplane-panel.component.html',
  styleUrls: ['./airplane-panel.component.css']
})
export class AirplanePanelComponent implements OnInit {

  @Input()
  airplane : Airplane;

  constructor() { }

  ngOnInit(): void {
  }

}
