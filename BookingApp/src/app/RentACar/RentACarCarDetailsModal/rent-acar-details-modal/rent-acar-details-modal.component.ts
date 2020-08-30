import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEditCarModalComponent } from '../../RentACarAdmin/rent-acar-edit-car-modal/rent-acar-edit-car-modal.component';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarDeleteCarModalComponent } from '../../RentACarAdmin/rent-acar-delete-car-modal/rent-acar-delete-car-modal.component';
import { RentACarSetDiscountModalComponent } from '../../RentACarAdmin/rent-acar-set-discount-modal/rent-acar-set-discount-modal.component';

import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';

@Component({
  selector: 'app-rent-acar-details-modal',
  templateUrl: './rent-acar-details-modal.component.html',
  styleUrls: ['./rent-acar-details-modal.component.css']
})
export class RentACarDetailsModalComponent implements OnInit {
  
  @Input()
  item : Car
  role: string;
  disableButtons: boolean = false;
  constructor(public activeModal : NgbActiveModal, private modalService : NgbModal,private EnterpriseService: RentACarEnterpriseServiceService) { 
    this.role = localStorage["Role"]
  }
  CarRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  ngOnInit(): void {
  
    this.checkRentedDates();
    this.updateStars();
    this.getArrayValues(0);
  }
  updateStars() {

    var rating = 0;
    for(let j = 0; j < this.item.ratings.length; j++){
      rating = rating + this.item.ratings[j].rating;
    }
   
    rating = Math.ceil(rating / this.item.ratings.length);
    this.isHalf = rating %1 !== 0? true : false;
    for(let i=0; i<rating;i++){
      this.CarRatingArr.push(i)
    }
   
  }
 getArrayValues(index) {
    setInterval(() => {
      if(index == this.CarRatingArr.length)
        return;
      this.animeArr.push(this.CarRatingArr[index]);
      index++;
    }, 50);
  }

  checkRentedDates(){
    var today = new Date();
    
    
    for(let i: number = 0; i < this.item.reservations.length; i++){
      if((today.getTime() <= this.item.reservations[i].dateTo.getTime()) && (today.getTime() >= this.item.reservations[i].dateFrom.getTime())){
            this.disableButtons = true;
              break;
      }
    }
  }

  openEditCarModal(carId: number){
    const modalRef = this.modalService.open(RentACarEditCarModalComponent);
    modalRef.componentInstance.item = this.item;
  }

  openDeleteCarModal(carId: number){
    const modalRef = this.modalService.open(RentACarDeleteCarModalComponent);
    modalRef.componentInstance.item = this.item;
  }

  openSetDiscountModal(carId: number){
    const modalRef = this.modalService.open(RentACarSetDiscountModalComponent);
    modalRef.componentInstance.item = this.item;
  }
}
