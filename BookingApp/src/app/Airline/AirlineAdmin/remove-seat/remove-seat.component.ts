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
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Ticket } from 'src/app/Shared/Model/Airlines/Ticket.model';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';
import { ToastrService } from 'ngx-toastr';

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
  selectedSeats : Ticket[] = []
  constructor(private router : Router,private network : AirlineAdminNetworkService,private toast : ToastrService,private route : ActivatedRoute,private background : BackgroundService) { }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.FlightEdit);
  });
      this.sub = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.seats = data.details.seats;
    })    
  }

  OnClick(){
      this.network.RemoveSeat(+this.selectedSeats[0].row,+this.selectedSeats[0].column,+this.route.snapshot.params.id).subscribe(i =>{
        this.toast.success('Seat successfully removed');
        this.router.navigate(['']);
      })
    
  }

}
