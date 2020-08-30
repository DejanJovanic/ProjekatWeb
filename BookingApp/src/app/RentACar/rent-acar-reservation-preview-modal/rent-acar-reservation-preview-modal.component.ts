import { Component, OnInit, Input } from '@angular/core';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  dateToo: Date;
   CarRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
   this.originalPrice = this.item.numberOfDays * this.item.selectedCar.price;
   this.dateFromm = this.item.dateFrom.toDateString();
   this.dateToo = new Date(this.item.dateTo);
   
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

}
