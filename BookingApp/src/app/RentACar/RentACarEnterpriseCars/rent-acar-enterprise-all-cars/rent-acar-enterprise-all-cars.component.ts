import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
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
  
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { }
  
  searchCars(){
    var carBrand = this.searchCarsForm.value.carBrand;
    var carModel = this.searchCarsForm.value.carModel;
    var carType = this.searchCarsForm.value.carType; 
    var carTransmission = this.searchCarsForm.value.carTransmission; //uradjeno
    var carFuel = this.searchCarsForm.value.carFuel; //uradjeno
    var carNumberOfSeats = +this.searchCarsForm.value.carNumberOfSeats; //uradjeno
    var carYearOfProductionFrom = +this.searchCarsForm.value.carYearOfProductionFrom; //uradjeno
    var carYearOfProductionTo = +this.searchCarsForm.value.carYearOfProductionTo; //uradjeno
    var carPriceFrom = +this.searchCarsForm.value.carPriceFrom; //uradjeno
    var carPriceTo = +this.searchCarsForm.value.carPriceTo; //uradjeno
   
   
    for(let i: number = 0; (i < this.Enterprise.EnterpriseCars.length); i++){
      //console.log(this.Enterprise.EnterpriseCars[i].CarBrand); 
      if (carPriceFrom != null){
          if(carPriceFrom > this.Enterprise.EnterpriseCars[i].CarPrice){
            console.log(carPriceFrom);
              continue;
          }
      }

      if(carPriceTo != null){
          if(carPriceTo < this.Enterprise.EnterpriseCars[i].CarPrice){
            console.log(carPriceTo);
              continue;
          }
      }

      if (carYearOfProductionFrom != null){
        if(carYearOfProductionFrom > this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
          continue;
        }
      }

      if(carYearOfProductionTo != null){
        if(carYearOfProductionTo < this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
          continue;
        }
      }

      if(carNumberOfSeats != null){
        if(carNumberOfSeats != this.Enterprise.EnterpriseCars[i].CarNumberOfSeats){
          continue;
        }
      }

      if(carFuel != ""){
        if(carFuel != this.Enterprise.EnterpriseCars[i].CarFuelType){
          continue;
        }
      }

      if(carTransmission != ""){
        if(carTransmission != this.Enterprise.EnterpriseCars[i].CarTransmissionType){
          continue;
        }
      }

      if(carType != ""){
        if(carType != this.Enterprise.EnterpriseCars[i].CarType){
          continue;
        }
      }

      if(carBrand != ""){
        if(carBrand != this.Enterprise.EnterpriseCars[i].CarBrand){
          continue;
        }
      }

      if(carModel != ""){
        if(carModel != this.Enterprise.EnterpriseCars[i].CarModel){
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
  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
     
      this.slides = this.chunk(this.Enterprise.EnterpriseCars, 3);
    });
  }


}
