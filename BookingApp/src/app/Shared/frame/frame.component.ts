import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BackgroundService } from '../Services/Background/background.service';

@Component({
  selector: 'app-root',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  constructor(private router : Router,public background : BackgroundService) {
    /* router.events.subscribe( e =>{
      if(e instanceof NavigationStart){
        if(e.url.includes('/main/')){
          this.showNav = true;
        }
        else{
          this.showNav = false;
        }
      }
    }) */
   }

  ngOnInit(): void {
  }

}
