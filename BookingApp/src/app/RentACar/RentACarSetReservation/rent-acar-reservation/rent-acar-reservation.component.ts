import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { DatePipe } from '@angular/common'
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../Services/CarService/car.service';
import { SearchCarsForRentParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarsForRentParameters.model';
import { RentACarReservationPreviewModalComponent } from '../../rent-acar-reservation-preview-modal/rent-acar-reservation-preview-modal.component';
import { CarReservation } from 'src/app/Shared/Model/RentACars/Models/CarReservation.model';
import { CarReservationParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/CarReservationParameters.model';
@Component({
  selector: 'app-rent-acar-reservation',
  templateUrl: './rent-acar-reservation.component.html',
  styleUrls: ['./rent-acar-reservation.component.css']
})
export class RentACarReservationComponent implements OnInit {
  searchCarsForm: FormGroup;
  Cars;
  CarReservation;
  CarReservationParam: CarReservationParameters;
  id: number;
  minDate = undefined;
  slides: any = [[]];
 
 
  constructor(private toaster: ToastrService, private carService: CarService, private service: ValidationService, private route: ActivatedRoute, private modalService : NgbModal, public datepipe: DatePipe) { 
    const current = new Date();
    this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
     
    });

    this.setForm();
  }
  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  setForm(){
    
    
    this.searchCarsForm = new FormGroup({
      carPlacePickUp: new FormControl('', [Validators.required, this.service.lettersValidator]),
      carPlaceReturn: new FormControl('', [Validators.required, this.service.lettersValidator]),
      dateFrom: new FormControl('', [Validators.required, this.service.firstDateValidator]),
      dateTo: new FormControl('', [Validators.required, this.service.secondDateValidator]),
      carType: new FormControl('', Validators.required),
      carNumberOfPassengers: new FormControl('', Validators.required),
      carPriceFrom: new FormControl('', this.service.numbersValidator),
      carPriceTo: new FormControl('', this.service.numbersValidator)
    });
  }
  searchCars(){ 
    var parameters = new SearchCarsForRentParameters();

    parameters.enterpriseId = this.id;
    parameters.numberOfPassengers = this.searchCarsForm.value.carNumberOfPassengers; 
    parameters.pickUpPlace = this.searchCarsForm.value.carPlacePickUp;
    parameters.returnPlace = this.searchCarsForm.value.carPlaceReturn;
    parameters.carType = this.searchCarsForm.value.carType; 
    parameters.priceFrom = this.searchCarsForm.value.carPriceFrom;
    parameters.priceTo = this.searchCarsForm.value.carPriceTo;
    parameters.dateFrom = new Date(this.searchCarsForm.value.dateFrom.year,this.searchCarsForm.value.dateFrom.month -1,
      this.searchCarsForm.value.dateFrom.day);
    parameters.dateTo = new Date(this.searchCarsForm.value.dateTo.year,this.searchCarsForm.value.dateTo.month -1,
      this.searchCarsForm.value.dateTo.day);
    
      this.carService.searchCarsForRent(parameters).subscribe(i =>{
        this.Cars = i;
        
        this.slides = this.chunk(this.Cars, 3);
        this.toaster.success("Your search request has been successfully executed",'Free cars',{
          timeOut : 3000
        })
      
      })
  
   
  
  }

  openCarDetailsModal(carId: number){
    this.CarReservationParam = new CarReservationParameters();
    
    this.CarReservationParam.dateFrom = new Date(this.searchCarsForm.value.dateFrom.year,this.searchCarsForm.value.dateFrom.month - 1,
      this.searchCarsForm.value.dateFrom.day+1);
    this.CarReservationParam.dateTo = new Date(this.searchCarsForm.value.dateTo.year,this.searchCarsForm.value.dateTo.month -1,
      this.searchCarsForm.value.dateTo.day+1);
    this.CarReservationParam.carId = carId;
    this.CarReservationParam.enterpriseId = this.id
    this.carService.createReservation(this.CarReservationParam).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarReservationPreviewModalComponent);
      this.CarReservation = i;

      
      this.toaster.success("Your request has been successfully executed",'Reservation details',{
        timeOut : 3000
      })

      modalRef.componentInstance.item = this.CarReservation;
    })
  }
  
  

 
}
