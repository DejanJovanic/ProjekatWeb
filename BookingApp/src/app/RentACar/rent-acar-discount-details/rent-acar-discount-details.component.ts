import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../Services/ValidationService/validation.service';
import { CarReservationParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/CarReservationParameters.model';
import { CarService } from '../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';
import { DiscountDetails } from 'src/app/Shared/Model/RentACars/Models/DiscountDetails.model';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { RentACarReservationConfirmationModalComponent } from '../rent-acar-reservation-confirmation-modal/rent-acar-reservation-confirmation-modal.component';
import { RentACarFastReservationConfirmationComponent } from '../rent-acar-fast-reservation-confirmation/rent-acar-fast-reservation-confirmation.component';

@Component({
  selector: 'app-rent-acar-discount-details',
  templateUrl: './rent-acar-discount-details.component.html',
  styleUrls: ['./rent-acar-discount-details.component.css']
})
export class RentACarDiscountDetailsComponent implements OnInit {
  CarRatingArr=[];
  animeArr=[];
  counter;
  isHalf = false;
  CarReservationParam : DiscountDetails;
  CarReservation;
  dateFromm: string;
  discount: string;
  realizedPackage: string;
  discount2: number;
  dateToo: string;
  dateTo: Date;
  rentedDayy: Date;
  nndays: number;
  pricee: number;
  rentedDay:string;
  dateFrom: Date;
  originalPrice: number;
  @Input()
  item : Car
  role: string;
  constructor(private toaster : ToastrService, private carService : CarService, private service : ValidationService, public activeModal : NgbActiveModal, private modalService : NgbModal) { }


  ngOnInit(): void {
    this.role = localStorage["Role"];

    this.CarReservationParam = new DiscountDetails();
    
    this.CarReservationParam.dateFrom = this.item.discounts[0].discountFrom;
    this.CarReservationParam.dateTo = this.item.discounts[0].discountTo;
    this.discount2 = this.item.discounts[0].discountPercentage;
    this.CarReservationParam.carId = this.item.id;
    this.CarReservationParam.rentedDay = new Date();
    this.CarReservationParam.enterpriseId = this.item.enterpriseId;
    this.CarReservationParam.percentage = this.item.discounts[0].discountPercentage;
    this.CarReservationParam.username = localStorage["username"];
    this.carService.createReservationForCarOnDiscount(this.CarReservationParam).subscribe(i =>{
     
      this.CarReservation = i;

      
      this.toaster.success("Your request has been successfully executed",'Reservation details',{
        timeOut : 2000

      })
      if(this.CarReservation.realizedPackage != null){
        this.realizedPackage = this.CarReservation.realizedPackage.name;
        this.discount = this.CarReservation.realizedPackage.discount.toString() + "%";
     }
      else{
        this.realizedPackage = "Not realized.";
        this.discount = "Not realized."
      }
      this.pricee = this.CarReservation.price;
      this.nndays = this.CarReservation.numberOfDays;
      this.originalPrice = this.CarReservation.numberOfDays * this.item.price;
      this.rentedDayy = new Date(this.CarReservation.rentedDay);
     this.dateFrom = new Date(this.CarReservation.dateFrom);
     this.dateTo = new Date(this.CarReservation.dateTo);
     this.dateToo = this.dateTo.toDateString();
     this.dateFromm = this.dateFrom.toDateString();
     this.rentedDay = this.rentedDayy.toDateString();
     this.updateStars();
     this.getArrayValues(0);
     
    })
   
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

  openConfirmationModal(){
    const modalRef = this.modalService.open(RentACarFastReservationConfirmationComponent);
    modalRef.componentInstance.item = this.CarReservation;
    this.activeModal.close();
  }
}
