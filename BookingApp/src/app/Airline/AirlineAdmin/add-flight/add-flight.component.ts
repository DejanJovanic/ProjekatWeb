import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { AirlineAdminNetworkService } from '../Services/AirlineAdminNetwork/airline-admin-network.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit, OnDestroy{

  sub : Subscription;
  isOk : boolean;
  
  constructor(private network : AirlineAdminNetworkService,private router : Router) { }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }


  ngOnInit(): void {
  }

  SetFlight($event : Flight){
    this.sub = this.network.SetFlight($event).subscribe({
      next : i => this.isOk = i,
      error : _ => {},
      complete : () =>{
        if(this.isOk){
          this.router.navigate(['']);
        }
      }
    })
  }
}
