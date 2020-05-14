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
  
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal) { }
  
  openCarDetailsModal(index: number){
    const modalRef = this.modalService.open(RentACarDetailsModalComponent);
    modalRef.componentInstance.item = this.Enterprise.EnterpriseCars[index];
  }
  searchCars(){
    var carBrand = this.searchCarsForm.value.carBrand;
    var carModel = this.searchCarsForm.value.carModel;
    var carType = this.searchCarsForm.value.carType; 
    var carTransmission = this.searchCarsForm.value.carTransmission; 
    var carFuel = this.searchCarsForm.value.carFuel; 
    var carNumberOfSeats = parseInt(this.searchCarsForm.value.carNumberOfSeats); 
    var carYearOfProductionFrom = parseInt(this.searchCarsForm.value.carYearOfProductionFrom); 
    var carYearOfProductionTo = parseInt(this.searchCarsForm.value.carYearOfProductionTo); 
    var carPriceFrom = parseInt(this.searchCarsForm.value.carPriceFrom); 
    var carPriceTo = parseInt(this.searchCarsForm.value.carPriceTo);
    //console.log(carPriceTo);
    console.log(carBrand);
    for(let i: number = 0; (i < this.Enterprise.EnterpriseCars.length); i++){
      
      if (carPriceFrom != NaN){
          if(carPriceFrom > this.Enterprise.EnterpriseCars[i].CarPrice){
            console.log(carBrand);
              continue;
          }
      }
      
      if(carPriceTo != NaN){
          if(carPriceTo < this.Enterprise.EnterpriseCars[i].CarPrice){
            console.log(carBrand);
              continue;
          }
      }

      if (carYearOfProductionFrom != NaN){
        if(carYearOfProductionFrom > this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
          console.log(carBrand);
          continue;
        }
      }

      if(carYearOfProductionTo != NaN){
        if(carYearOfProductionTo < this.Enterprise.EnterpriseCars[i].CarYearOfProduction){
          console.log(carBrand);
          continue;
        }
      }

      if(carNumberOfSeats != NaN){
        if(carNumberOfSeats != this.Enterprise.EnterpriseCars[i].CarNumberOfSeats){
          console.log(carBrand);
          continue;
        }
      }

      if(carFuel != ""){
        if(carFuel.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarFuelType.toLowerCase() ){
          console.log(carBrand);
          continue;
        }
      }

      if(carTransmission != ""){
        if(carTransmission.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarTransmissionType.toLowerCase() ){
          console.log(carBrand);
          continue;
        }
      }

      if(carType != ""){
        if(carType.toLowerCase()  != this.Enterprise.EnterpriseCars[i].CarType.toLowerCase() ){
          console.log(carBrand);
          continue;
        }
      }

      if(carBrand != ""){
        console.log(carBrand);

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
    for(let i: number = 0; (i < this.RentACarSearchedCars.length); i++){
      console.log(this.RentACarSearchedCars[i].CarBrand);
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
