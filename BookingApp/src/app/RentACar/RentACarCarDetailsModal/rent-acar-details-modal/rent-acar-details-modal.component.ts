import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { RentACarEditCarModalComponent } from '../../RentACarAdmin/rent-acar-edit-car-modal/rent-acar-edit-car-modal.component';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';

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
    this.role = sessionStorage["Role"]
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
    this.isHalf = this.item.CarRating %1 !== 0? true : false;
    for(let i=0; i<this.item.CarRating;i++){
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
    var d1 = today.toDateString();
    
    for(let i: number = 0; i < this.item.CarRentedDates.length; i++){
      if((Date.parse(d1) <= Date.parse(this.item.CarRentedDates[i]))){
            this.disableButtons = true;
              break;
      }
    }
  }

  openEditCarModal(carId: number){
    const modalRef = this.modalService.open(RentACarEditCarModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneCar(carId);
  }
}
