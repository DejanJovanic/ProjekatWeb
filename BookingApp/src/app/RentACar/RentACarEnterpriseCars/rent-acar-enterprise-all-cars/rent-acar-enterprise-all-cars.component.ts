import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component'
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RentACarAddCarModalComponent } from '../../RentACarAdmin/rent-acar-add-car-modal/rent-acar-add-car-modal.component';
import { CarService } from '../../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { SearchCarParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarParameters.model';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';


@Component({
  selector: 'app-rent-acar-enterprise-all-cars',
  templateUrl: './rent-acar-enterprise-all-cars.component.html',
  styleUrls: ['./rent-acar-enterprise-all-cars.component.css']
})
export class RentACarEnterpriseAllCarsComponent implements OnInit {
  searchCarsForm: FormGroup;
  Car;
  Enterprise;
  //CarDetails;
  id: number;
  RentACarSearchedCars: Car[] = [];
  role: string;
  slides: any = [[]];
  Cars;
  
  constructor(private enterpriseService: EnterpriseService, private validationService: ValidationService, private toaster: ToastrService, private carService: CarService, private route: ActivatedRoute, private modalService : NgbModal, public datepipe: DatePipe) { 
    this.role = localStorage["Role"]
  }
  
  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      
    });
    
    this.carService.getAllCars(this.id).subscribe(i =>{
      this.Cars = i;
      this.slides = this.chunk(this.Cars, 3);
      this.toaster.success("Your request has been successfully executed",'Cars',{
        timeOut : 3000
      })
    })
    
    this.setForm();
  }

  setForm(){
    this.searchCarsForm = new FormGroup({
      carBrand: new FormControl('', this.validationService.letters2Validator),
      carModel: new FormControl('', this.validationService.lettersAndNumbers),
      carType: new FormControl(''),
      carTransmission: new FormControl(''),
      carFuel: new FormControl(''),
      carNumberOfSeats: new FormControl(''),
      carYearOfProductionFrom: new FormControl('', [this.validationService.yearOfProductionValidator, this.validationService.numbersValidator]),
      carYearOfProductionTo: new FormControl('', [this.validationService.yearOfProductionValidator, this.validationService.numbersValidator]),
      carPriceFrom: new FormControl('', this.validationService.numbersValidator),
      carPriceTo: new FormControl('', this.validationService.numbersValidator)
      
    });
  }
  openCarDetailsModal(carId: number){
   
   
    this.carService.getOneCar(this.id, carId).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarDetailsModalComponent);
      this.Car = i;
      this.toaster.success("Your request has been successfully executed",'Car details',{
        timeOut : 3000
      })
      this.Car.enterpriseId = this.id;
      
      modalRef.componentInstance.item = this.Car;
    })
    
  }
  searchCars(){
   
    var parameters = new SearchCarParameters();
    parameters.brand = this.searchCarsForm.value.carBrand;
    parameters.model = this.searchCarsForm.value.carModel;
    parameters.fuelType = this.searchCarsForm.value.carFuel; 
    parameters.type = this.searchCarsForm.value.carType; 
    parameters.yearOfProductionFrom = this.searchCarsForm.value.carYearOfProductionFrom; 
    parameters.yearOfProductionTo =this.searchCarsForm.value.carYearOfProductionTo;
    parameters.transmissionType = this.searchCarsForm.value.carTransmission; 
    parameters.enterpriseId = this.id;
    parameters.numberOfSeats = this.searchCarsForm.value.carNumberOfSeats; 
    parameters.priceFrom = this.searchCarsForm.value.carPriceFrom;
    parameters.priceTo = this.searchCarsForm.value.carPriceTo;
    
    this.carService.searchAllCars(parameters).subscribe(i =>{
      this.Cars = i;
      
      this.slides = this.chunk(this.Cars, 3);
      this.toaster.success("Your search request has been successfully executed",'Searched cars',{
        timeOut : 3000
      })
    
    })
    
  }

  showAllCars(){
    this.searchCarsForm.reset();
    this.setForm();
    this.carService.getAllCars(this.id).subscribe(i =>{
      this.Cars = i;
      this.slides = this.chunk(this.Cars, 3);
      this.toaster.success("Your request has been successfully executed",'Cars',{
        timeOut : 3000
      })
    })
    
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  openCarAddModal(enterpriseId: number){
    const modalRef = this.modalService.open(RentACarAddCarModalComponent);
    modalRef.componentInstance.item = enterpriseId;
  }
  
}
