import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FlightSearchService } from '../Services/FlightSearch/flight-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-airline-search',
  templateUrl: './airline-search.component.html',
  styleUrls: ['./airline-search.component.css'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height:'0',
        overflow:'hidden',
        opacity:'0'
      })),
      state('final', style({
        overflow:'hidden',
        opacity:'1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class AirlineSearchComponent implements OnInit, OnDestroy {

  isCollapsed = true;
  searchSub : Subscription
  constructor(private searchService: FlightSearchService) { }
  ngOnDestroy(): void {
    if(this.searchSub)
      this.searchSub.unsubscribe();
  }

  ngOnInit(): void {
  }
  GetAll(){
    if(this.searchSub)
      this.searchSub.unsubscribe();
    this.searchSub = this.searchService.getResults(null).subscribe(i => {});
  }
}
