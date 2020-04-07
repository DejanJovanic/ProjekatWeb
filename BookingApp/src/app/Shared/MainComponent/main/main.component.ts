import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public links;
  constructor(private router : Router) { }

  ngOnInit(): void {
     this.links = [
      {title : "Flights" , route : "/Airlines"}
    ];
    this.router.navigate(['/Airlines'])
  }

}
