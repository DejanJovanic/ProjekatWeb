import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component'
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rent-acar-enterprise-all-cars',
  templateUrl: './rent-acar-enterprise-all-cars.component.html',
  styleUrls: ['./rent-acar-enterprise-all-cars.component.css']
})
export class RentACarEnterpriseAllCarsComponent implements OnInit {
  searchCarsForm = new FormGroup({
    carBrand: new FormControl(''),
    carModel: new FormControl(''),
    carType: new FormControl(''),
    carTransmission: new FormControl(''),
    carFuel: new FormControl(''),
    carNumberOfSeats: new FormControl(''),
    carYearOfProductionFrom: new FormControl(''),
    carYearOfProductionTo: new FormControl(''),
    carPriceFrom: new FormControl(''),
    carPriceTo: new FormControl('')
    
  });
  
  Enterprise: RentACarEnterprise;
  id: number;
  RentACarSearchedCars: Car[] = [];
  role: string;
  slides: any = [[]];
 
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal) { 
    this.role = sessionStorage["Role"]
  }
  
  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
     
     
    });
    this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
  }

  
  openCarDetailsModal(carId: number, enterpriseId: number){
    const modalRef = this.modalService.open(RentACarDetailsModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneCar(carId, enterpriseId);
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
    
    this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


}
