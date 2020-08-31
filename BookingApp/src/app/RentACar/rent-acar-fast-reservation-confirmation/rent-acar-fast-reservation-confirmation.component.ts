import { Component, OnInit, Input } from '@angular/core';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../Services/CarService/car.service';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/Models/SpecialOffer.model';

@Component({
  selector: 'app-rent-acar-fast-reservation-confirmation',
  templateUrl: './rent-acar-fast-reservation-confirmation.component.html',
  styleUrls: ['./rent-acar-fast-reservation-confirmation.component.css']
})
export class RentACarFastReservationConfirmationComponent implements OnInit {

  @Input()
  item: CarReservation
  return;
  constructor(private routeService: Router, public activeModal : NgbActiveModal, private toaster: ToastrService, private carService: CarService) { }

  ngOnInit(): void {
  }

  setReservation(){
    if(this.item.realizedPackage == null)
      this.item.realizedPackage = new SpecialOffer();
      this.carService.SetReservationForDiscount(this.item).subscribe(i =>{
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
