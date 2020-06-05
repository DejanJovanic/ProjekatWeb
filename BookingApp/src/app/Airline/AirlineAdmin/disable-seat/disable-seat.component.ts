import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AirlineAdminNetworkService } from '../Services/AirlineAdminNetwork/airline-admin-network.service';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-disable-seat',
  templateUrl: './disable-seat.component.html',
  styleUrls: ['./disable-seat.component.css']
})
export class DisableSeatComponent implements OnInit, OnDestroy {

  flight : Flight
  sub : Subscription;
  SeatDisplayState = SeatDisplayState;
  seats : Seats;
  form : FormGroup;
  constructor(private router : Router,private network : AirlineAdminNetworkService,private cache : AirlineCacheService,private route : ActivatedRoute,private builder : FormBuilder) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      row : ['',[Validators.pattern(/^[0-9]+$/),Validators.required]],
      column : ['',[Validators.pattern(/^[0-9]+$/),Validators.required]]
    })
    this.sub = this.route.params.subscribe(i =>{
      let id = +i['id'];
      this.flight = this.cache.airlines.getValue()[0].flights.filter(i => i.id == id)[0];
      this.seats = new Seats();
      this.seats.colNum = this.flight.airplane.columns;
      this.seats.rowNum = this.flight.airplane.rows;
      this.seats.CreateSeats(this.flight);
    })
    
  }

  OnSubmit(){
    if(this.form.valid){
      this.network.DisableSeat(+this.form.value.row - 1,+this.form.value.column - 1,this.flight.id).subscribe(i =>{
        this.router.navigate(['']);
      })
    }
  }

}
