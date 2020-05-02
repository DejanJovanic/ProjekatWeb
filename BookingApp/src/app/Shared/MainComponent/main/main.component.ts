import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public links;
  constructor(private router : Router,private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage["Role"] == null)
    {
      this.links = [
        {title : "Flights" , route : "Airlines"}
        
      ];
      this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
    }
    else{
      switch(sessionStorage["Role"]){
        case "User":
          this.links = [
            {title : "Flights" , route : "Airlines"}
            
          ];
          this.router.navigate(['Airlines'],{ relativeTo : this.activeRoute});
          break;
      }
    }
   
  }

}
