import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';
import { WholeNumber } from '../../AirlineShared/Validators/WholeNumber.validator';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private router : Router,private network : AirlineAdminNetworkService,private toast : ToastrService,private route : ActivatedRoute,private builder : FormBuilder,private background : BackgroundService) { }

  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.FlightEdit);
  });
      this.form = this.builder.group({
        rowTop : [0,[Validators.required,Validators.min(0),WholeNumber]],
        rowBottom: [0,[Validators.required,Validators.min(0),WholeNumber]],
        columnLeft: [0,[Validators.required,Validators.min(0),WholeNumber]],
        columnRight: [0,[Validators.required,Validators.min(0),WholeNumber]]
      })
      this.sub = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.seats = data.details.seats;
    })    
  }
  get rowTop(){
    return this.form.get('rowTop')
  }
  get rowBottom(){
    return this.form.get('rowBottom')
  }
  get columnLeft(){
    return this.form.get('columnLeft')
  }
  get columnRight(){
    return this.form.get('columnRight')
  }

  OnSubmit(){
      this.network.AddSeats(+this.form.value.rowTop,+this.form.value.rowBottom,+this.form.value.columnLeft,+this.form.value.columnRight,+this.route.snapshot.params.id).subscribe(i =>{
        this.toast.success('Seat successfully added')
        this.router.navigate(['']);
      })
  }
}
