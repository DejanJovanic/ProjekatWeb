import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirlineCacheService } from '../../AirlineShared/Services/AirlineCache/airline-cache.service';
import { Flight } from 'src/app/Shared/Model/Airlines/Flight.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { SeatStatus } from 'src/app/Shared/Model/Airlines/SeatStatus.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirlineAdminNetworkService } from '../Services/AirlineAdminNetwork/airline-admin-network.service';

@Component({
  selector: 'app-remove-seat',
  templateUrl: './remove-seat.component.html',
  styleUrls: ['./remove-seat.component.css']
})
export class RemoveSeatComponent implements OnInit, OnDestroy {

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
      index : ['',[Validators.pattern(/^[0-9]+$/),Validators.required]]
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
      let row = Math.floor((+this.form.value.index - 1) / this.seats.colNum);
      let col = (+this.form.value.index - 1) % this.seats.colNum;
      this.network.RemoveSeat(row,col,this.flight.id).subscribe(i =>{
        this.router.navigate(['']);
      })
    }
  }

}
