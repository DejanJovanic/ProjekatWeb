import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component'
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RentACarAddCarModalComponent } from '../../RentACarAdmin/rent-acar-add-car-modal/rent-acar-add-car-modal.component';

@Component({
  selector: 'app-rent-acar-enterprise-all-cars',
  templateUrl: './rent-acar-enterprise-all-cars.component.html',
  styleUrls: ['./rent-acar-enterprise-all-cars.component.css']
})
export class RentACarEnterpriseAllCarsComponent implements OnInit {
  searchCarsForm: FormGroup;
  
  Enterprise: RentACarEnterprise;
  id: number;
  RentACarSearchedCars: Car[] = [];
  role: string;
  slides: any = [[]];
  Cars: Car[] = [];
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal, public datepipe: DatePipe) { 
    this.role = localStorage["Role"]
  }
  
  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      
    });
    
    this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
    this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
    this.setForm();
  }

  setForm(){
    this.searchCarsForm = new FormGroup({
      carBrand: new FormControl('', this.lettersValidator),
      carModel: new FormControl('', this.lettersAndNumbers),
      carType: new FormControl(''),
      carTransmission: new FormControl(''),
      carFuel: new FormControl(''),
      carNumberOfSeats: new FormControl(''),
      carYearOfProductionFrom: new FormControl('', [this.yearOfProductionValidator, this.numbersValidator]),
      carYearOfProductionTo: new FormControl('', [this.yearOfProductionValidator, this.numbersValidator]),
      carPriceFrom: new FormControl('', this.numbersValidator),
      carPriceTo: new FormControl('', this.numbersValidator)
      
    });
  }
  openCarDetailsModal(carId: number){
    const modalRef = this.modalService.open(RentACarDetailsModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneCar(carId);
  }
  searchCars(){
    var carBrand = this.searchCarsForm.value.carBrand;
    var carModel = this.searchCarsForm.value.carModel;
    var carType = this.searchCarsForm.value.carType; 
    var carTransmission = this.searchCarsForm.value.carTransmission; 
    var carFuel = this.searchCarsForm.value.carFuel; 
    var carNumberOfSeats = this.searchCarsForm.value.carNumberOfSeats; 
    var carYearOfProductionFrom = this.searchCarsForm.value.carYearOfProductionFrom; 
    var carYearOfProductionTo = this.searchCarsForm.value.carYearOfProductionTo; 
    var carPriceFrom = this.searchCarsForm.value.carPriceFrom; 
    var carPriceTo = this.searchCarsForm.value.carPriceTo;
   
    for(let i: number = 0; (i < this.Enterprise.EnterpriseCars.length); i++){
      
      if (carPriceFrom != ""){
          if(parseInt(carPriceFrom) > this.Enterprise.EnterpriseCars[i].CarPrice){
            
              continue;
          }
      }
      
      if(carPriceTo != ""){
          if(parseInt(carPriceTo) < this.Enterprise.EnterpriseCars[i].CarPrice){
            
              continue;
          }
      }

      if (carYearOfProductionFrom != ""){
        if(parseInt(carYearOfProductionFrom) > this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
         
          continue;
        }
      }

      if(carYearOfProductionTo != ""){
        if(parseInt(carYearOfProductionTo) < this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
        
          continue;
        }
      }

      if(carNumberOfSeats != ""){
        if(parseInt(carNumberOfSeats) != this.Enterprise.EnterpriseCars[i].CarNumberOfSeats){
     
          continue;
        }
      }

      if(carFuel != ""){
        if(carFuel.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarFuelType.toLowerCase() ){
         
          continue;
        }
      }

      if(carTransmission != ""){
        if(carTransmission.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarTransmissionType.toLowerCase() ){
         
          continue;
        }
      }

      if(carType != ""){
        if(carType.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarType.toLowerCase() ){
          
          continue;
        }
      }

      if(carBrand != ""){
        if(carBrand.toLowerCase() != this.Enterprise.EnterpriseCars[i].CarBrand.toLowerCase() ){
          continue;
        }
      }

      if(carModel != ""){
        if(carModel.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarModel.toLowerCase() ){
          continue;
        }
      }

      this.RentACarSearchedCars.push(this.Enterprise.EnterpriseCars[i]);  
    }
    
    this.slides = this.chunk(this.RentACarSearchedCars, 3);
    this.RentACarSearchedCars = [];
  }

  showAllCars(){
    this.searchCarsForm.reset();
    this.setForm();
    this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
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
    modalRef.componentInstance.item = this.EnterpriseService.getRentACarEnterprise(enterpriseId);
  }
  lettersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[a-zA-Z]*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

  numbersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[0-9]*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

  lettersAndNumbers(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^(?:[A-Za-z]*)(?:[A-Za-z0-9 _]*)$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
   
  }

  yearOfProductionValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const yearOfProductionValue = control.value;

      if((yearOfProductionValue !== '' && yearOfProductionValue < 1990) || (yearOfProductionValue !== '' &&  yearOfProductionValue > 2020)){
        return{
          Error: true
        };
      }
    }
    return null;
  }
}
