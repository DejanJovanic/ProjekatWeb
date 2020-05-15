import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';

@Component({
  selector: 'app-rent-acar-details-modal',
  templateUrl: './rent-acar-details-modal.component.html',
  styleUrls: ['./rent-acar-details-modal.component.css']
})
export class RentACarDetailsModalComponent implements OnInit {
  
  @Input()
  item : Car
  constructor(public activeModal : NgbActiveModal) { }
  CarRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  ngOnInit(): void {
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
}
