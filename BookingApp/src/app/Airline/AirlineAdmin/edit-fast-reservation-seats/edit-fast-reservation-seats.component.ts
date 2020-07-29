import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Seats } from 'src/app/Shared/Model/Airlines/Seats.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { SeatDisplayState } from 'src/app/Shared/Model/Airlines/SeatDisplayState.model';
import { Subscription } from 'rxjs';
import { SetFastFlightSeatsService } from '../Services/SetFastFlightSeats/set-fast-flight-seats.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-edit-fast-reservation-seats',
  templateUrl: './edit-fast-reservation-seats.component.html',
  styleUrls: ['./edit-fast-reservation-seats.component.css']
})
export class EditFastReservationSeatsComponent implements OnInit, OnDestroy {

  details : FlightDetails
  seats : Seats
  selectedSeats : Ticket[] = []
  sub : Subscription
  SeatDisplayState = SeatDisplayState;
  form : FormGroup;


  private isOkValidator : ValidatorFn = (fg: FormGroup) => {
    let isValid = fg.get('discountPercentage').valid
    return  isValid && this.selectedSeats.length > 0 ? null : {notOk : true};
  }

  constructor(private router : Router,private route : ActivatedRoute,private service : SetFastFlightSeatsService,private builder : FormBuilder) { }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      discountPercentage : [1,[Validators.required,Validators.min(1),Validators.max(100)]]
    })
    this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.seats = this.details.seats;
    })
  }

  OnSubmit(){
    if(this.form.valid){
      this.sub = this.service.EditFastReservationSeats(+this.route.snapshot.params.id,+this.form.value.discountPercentage,this.selectedSeats.map(i => ({row : i.row, column : i.column}))[0]).subscribe(i =>{
        if(i){
          this.router.navigate(['']);
        }
      })
    }
    
  }

}
