import { Component, OnInit, Input } from '@angular/core';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { ToastrService } from 'ngx-toastr';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../Services/CarService/car.service';

import { SpecialOffer } from 'src/app/Shared/Model/RentACars/Models/SpecialOffer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-reservation-confirmation-modal',
  templateUrl: './rent-acar-reservation-confirmation-modal.component.html',
  styleUrls: ['./rent-acar-reservation-confirmation-modal.component.css']
})
export class RentACarReservationConfirmationModalComponent implements OnInit {

  @Input()
  item: CarReservation
  return;
  constructor(private routeService: Router, public activeModal : NgbActiveModal, private toaster: ToastrService, private carService: CarService) { }

  ngOnInit(): void {
  }

  setReservation(){
    if(this.item.realizedPackage == null)
      this.item.realizedPackage = new SpecialOffer();
      this.carService.setReservation(this.item).subscribe(i =>{
          this.return = i;
          this.toaster.success("Your reservation request has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Create reservation',{
            timeOut : 2000
          })

          setTimeout(() => {
            this.routeService.navigate(['/EnterpriseProfile/', this.item.selectedEnterprise.id]);
        }, 3000); 

        this.activeModal.close();
      })
  }
}
