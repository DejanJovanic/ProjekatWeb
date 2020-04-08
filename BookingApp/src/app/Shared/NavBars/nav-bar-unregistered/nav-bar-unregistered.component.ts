import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-unregistered',
  templateUrl: './nav-bar-unregistered.component.html',
  styleUrls: ['./nav-bar-unregistered.component.css']
})


export class NavBarUnregisteredComponent implements OnInit {
  
  @Input() links;

  
  constructor() { }

  ngOnInit(): void {
  }

}
