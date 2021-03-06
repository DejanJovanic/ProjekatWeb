import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReservationConfirmation } from 'src/app/Shared/Model/Airlines/ReservationConfirmation.model';
import { AirlineNetworkService } from '../../AirlineShared/Services/AirlineNetwork/airline-network.service';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { switchMap } from 'rxjs/operators';
import { UserNetworkService } from 'src/app/Users/Services/UserNetwork/user-network.service';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';
import { Passport } from '../../AirlineShared/Validators/Passport.validator';

@Component({
  selector: 'app-reservation-confirmation',
  templateUrl: './reservation-confirmation.component.html',
  styleUrls: ['./reservation-confirmation.component.css']
})
export class ReservationConfirmationComponent implements OnInit,OnDestroy {

  form : FormGroup;
  selectedExtras : Extra[] = []
  maxWeight : number
  details : FlightDetails
  airlineId : number
  ticketId : number
  flightId : number
  obs : Subscription
  price : number;
  sub : Subscription
  subNetwork : Subscription
  public points : number

  constructor(private background : BackgroundService,private userNetwork : UserNetworkService,private network : AirlineNetworkService,private builder : FormBuilder,private router : Router,private route : ActivatedRoute,private userService : UserCacheService) {
    this.points = userService.currentUser.points;

  }
  private luggageValidator : ValidatorFn = (fg: FormGroup) => {
    const weigth = fg.get('luggageWeigth').value;
    for(let a of this.details.luggageOptions){
      if(a.from <= weigth && a.to >= weigth){
        return null
      }
    }
    return {notInRange : true}
  }
  ngOnDestroy(): void {
    if(this.obs) this.obs.unsubscribe();
    if(this.sub) this.sub.unsubscribe();
    if(this.subNetwork) this.subNetwork.unsubscribe();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.ReservationConfirmation);
  });
    this.obs = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.maxWeight = 0;
      this.price = data.details.price
      this.airlineId = this.route.snapshot.params.airlineId
      this.flightId = this.route.snapshot.params.flightId
      this.ticketId = this.route.snapshot.params.ticketId
      for(let a of this.details.luggageOptions){
        if(a.to > this.maxWeight) this.maxWeight = a.to;
      }
      this.form = this.builder.group({
        luggageWeigth:[0,[Validators.required,Validators.min(0),Validators.max(this.maxWeight)]],
        passportNum:['',[Validators.required,Passport]]
      },{validators : this.luggageValidator})
      this.sub = this.form.get('luggageWeigth').valueChanges.subscribe(i =>{
        if(i)
          this.CalculatePrice()
      } );
    })
    
  }

  public CalculatePrice(){
    this.price = this.details.price;
    
    let weight = this.form.value.luggageWeigth
    if(!isNaN(weight)){
      for(let a of this.details.luggageOptions){
        if(a.from <= weight && a.to >= weight){
          this.price += weight * a.price;
          break;
        }
      }
    }
  
    for(let a of this.selectedExtras){
      this.price += a.price;
    }
  }

  public ShouldBeDisplayed(item : Extra) : boolean{
    return this.selectedExtras.some(i => i.id == item.id)
  }
  public AddExtra(item : Extra){
    this.selectedExtras.push(item);
    this.CalculatePrice()
  }
  public RemoveExtra(item : Extra){
    this.selectedExtras.splice(this.selectedExtras.indexOf(item),1);
    this.CalculatePrice()
  }

  AcceptPoints(){
    if(this.form.valid){
      let temp = new ReservationConfirmation()
      temp.airlineId = +this.airlineId;
      temp.flightId = +this.flightId;
      temp.ticketId = +this.ticketId;
      temp.luggageWeight = +this.form.value.luggageWeigth
      temp.passportNumber = this.form.value.passportNum
      temp.investingPoints = true;

      for(let a of this.selectedExtras){
        temp.selectedExtras.push(a.id);
      }  
      this.subNetwork = this.network.confirmReservation(temp).pipe(switchMap(_ => this.userNetwork.GetUserDetails())).subscribe(i =>{
        this.router.navigate(['/main/Airlines'])
      })
    }
  }
  public Accept(){
    if(this.form.valid){
      let temp = new ReservationConfirmation()
      temp.airlineId = +this.airlineId;
      temp.flightId = +this.flightId;
      temp.ticketId = +this.ticketId;
      temp.luggageWeight = +this.form.value.luggageWeigth
      temp.passportNumber = this.form.value.passportNum
      temp.investingPoints = false;
      for(let a of this.selectedExtras){
        temp.selectedExtras.push(a.id);
      }  
      this.subNetwork = this.network.confirmReservation(temp).pipe(switchMap(_ => this.userNetwork.GetUserDetails())).subscribe(i =>{
        this.router.navigate(['/main/Airlines'])
      })
    }
  }

  public Reject(){
    let temp = new ReservationConfirmation()
    temp.airlineId = +this.airlineId;
    temp.flightId = +this.flightId;
    temp.ticketId = +this.ticketId;
    this.subNetwork = this.network.rejectReservation(temp).subscribe(i =>{
      this.router.navigate(['/main/Airlines'])
    })
  }

}
