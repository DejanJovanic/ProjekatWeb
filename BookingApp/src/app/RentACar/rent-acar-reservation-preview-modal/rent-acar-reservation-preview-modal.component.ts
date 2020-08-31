import { Component, OnInit, Input } from '@angular/core';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarReservationConfirmationModalComponent } from '../rent-acar-reservation-confirmation-modal/rent-acar-reservation-confirmation-modal.component';
import { CarReservation2 } from 'src/app/Shared/Model/RentACars/Models/CarReservation2.model';

@Component({
  selector: 'app-rent-acar-reservation-preview-modal',
  templateUrl: './rent-acar-reservation-preview-modal.component.html',
  styleUrls: ['./rent-acar-reservation-preview-modal.component.css']
})
export class RentACarReservationPreviewModalComponent implements OnInit {
  @Input()
  item : CarReservation
  originalPrice: number;
  dateFromm: string;
  discount: string;
  realizedPackage: string;

  dateToo: string;
  dateTo: Date;
  rentedDayy: Date;
  rentedDay:string;
  dateFrom: Date;
   CarRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  role: string;
  username: string;
  constructor(public activeModal : NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.role = localStorage["Role"];
    
    this.item.username = localStorage["username"];
   this.originalPrice = this.item.numberOfDays * this.item.selectedCar.price;
   if(this.item.realizedPackage != null){
      this.realizedPackage = this.item.realizedPackage.name;
      this.discount = this.item.realizedPackage.discount.toString() + "%";
   }
    else{
      this.realizedPackage = "Not realized.";
      this.discount = "Not realized."
    }

    this.rentedDayy = new Date(this.item.rentedDay);
   this.dateFrom = new Date(this.item.dateFrom);
   this.dateTo = new Date(this.item.dateTo);
   this.dateToo = this.dateTo.toDateString();
   this.dateFromm = this.dateFrom.toDateString();
   this.rentedDay = this.rentedDayy.toDateString();
   this.updateStars();
    this.getArrayValues(0);
  }

  updateStars() {

    var rating = 0;
    for(let j = 0; j < this.item.selectedCar.ratings.length; j++){
      rating = rating + this.item.selectedCar.ratings[j].rating;
    }
   
    rating = Math.ceil(rating / this.item.selectedCar.ratings.length);
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

  openConfirmationModal(){
   

    const modalRef = this.modalService.open(RentACarReservationConfirmationModalComponent);
    modalRef.componentInstance.item = this.item;
    this.activeModal.close();
     
  }

}
