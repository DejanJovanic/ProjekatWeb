import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-airline-rate',
  templateUrl: './airline-rate.component.html',
  styleUrls: ['./airline-rate.component.css']
})
export class AirlineRateComponent implements OnInit {

  @Input()
  airlineId :number;
  @Input()
  ticketId :number;
  form : FormGroup
  constructor(private builder : FormBuilder,public activeModal : NgbActiveModal,private client : HttpClient,private toast : ToastrService,private router : Router) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      flightRate : ['',[Validators.required,Validators.min(1),Validators.max(5)]],
      airlineRate : ['',[Validators.required,Validators.min(1),Validators.max(5)]],
    })
  }

  OnSubmit(){
    if(this.form.valid){
      this.client.post('http://localhost:50000/api/AirlineRatings',{
        airlineId : this.airlineId,
        ticketId : this.ticketId,
        flightRating : parseFloat(this.form.value.flightRate),
        airlineRating : parseFloat(this.form.value.airlineRate)
      }).subscribe(i =>{
        if(i){
          this.toast.success('Rating sent successfully. Thank you for your feedback')
          this.router.navigate(['/main/Airlines'])
          this.activeModal.close();
        }
      })
    }
  }

}
