import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-airline-filter',
  templateUrl: './airline-filter.component.html',
  styleUrls: ['./airline-filter.component.css']
})
export class AirlineFilterComponent implements OnInit {

  isCollapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
