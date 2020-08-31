import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { Extra } from 'src/app/Shared/Model/Airlines/Extra.model';
import { FlightDetails } from 'src/app/Shared/Model/Airlines/FlightDetails.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FastFlightService } from '../Services/FastFlight/fast-flight.service';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Passport } from '../../AirlineShared/Validators/Passport.validator';

@Component({
  selector: 'app-fast-flight-confirmation',
  templateUrl: './fast-flight-confirmation.component.html',
  styleUrls: ['./fast-flight-confirmation.component.css']
})
export class FastFlightConfirmationComponent implements OnInit,OnDestroy {

  form : FormGroup;
  selectedExtras : Extra[] = []
  maxWeight : number
  details : FlightDetails
  airlineId : number

  flightId : number
  obs : Subscription
  price : number;
  priceDiscount : number;
  sub : Subscription
  subNetwork : Subscription
  constructor(private network : FastFlightService,private builder : FormBuilder,private router : Router,private route : ActivatedRoute,private user : UserCacheService) { }
  ngOnDestroy(): void {
    if(this.obs) this.obs.unsubscribe();
    if(this.sub) this.sub.unsubscribe();
    if(this.subNetwork) this.subNetwork.unsubscribe();
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
  ngOnInit(): void {
    this.obs = this.route.data.subscribe((data : {details : FlightDetails}) =>{
      this.details = data.details;
      this.maxWeight = 0;
      this.price = data.details.price
      this.flightId = +this.route.snapshot.params.fastFlightId
      this.airlineId = this.network.airlineId;
      let flight = this.network.fastFlights.getValue().filter(i => i.id == this.flightId)[0];
      if(flight) this.priceDiscount = flight.discountPercentage
      else this.priceDiscount = 0;
      this.price -= this.price / 100 * this.priceDiscount
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

    this.price -= this.price / 100 * this.priceDiscount
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

  public Accept(){
    if(this.form.valid){

      this.subNetwork = this.network.SendFastFlightReservation(this.airlineId,this.user.currentUser.username,this.flightId,this.selectedExtras,
        this.form.value.luggageWeigth,this.form.value. passportNum).subscribe(i =>{
        this.router.navigate(['/main/Airlines'])
      })
    } 
  }

  public Reject(){
    this.router.navigate(['/main/Airlines'])
  }

}
