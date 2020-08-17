import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { Subscription } from 'rxjs';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineAdminNetworkService } from '../Services/AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';

@Component({
  selector: 'app-add-seats',
  templateUrl: './add-seats.component.html',
  styleUrls: ['./add-seats.component.css']
})
export class AddSeatsComponent implements OnInit {

  form : FormGroup
  flight : Flight
  sub : Subscription;
  SeatDisplayState = SeatDisplayState;
  seats : Seats;
  selectedSeats : Ticket[] = []
  constructor(private router : Router,private network : AirlineAdminNetworkService,private route : ActivatedRoute,private builder : FormBuilder) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {
      this.form = this.builder.group({
        rowTop : [0,[Validators.required,Validators.min(0)]],
        rowBottom: [0,[Validators.required,Validators.min(0)]],
        columnLeft: [0,[Validators.required,Validators.min(0)]],
        columnRight: [0,[Validators.required,Validators.min(0)]]
      })
      this.sub = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.seats = data.details.seats;
    })    
  }

  OnSubmit(){
      this.network.AddSeats(+this.form.value.rowTop,+this.form.value.rowBottom,+this.form.value.columnLeft,+this.form.value.columnRight,+this.route.snapshot.params.id).subscribe(i =>{
        this.router.navigate(['']);
      })
  }
}
