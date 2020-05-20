import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Params, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-rent-acar-reservation',
  templateUrl: './rent-acar-reservation.component.html',
  styleUrls: ['./rent-acar-reservation.component.css']
})
export class RentACarReservationComponent implements OnInit {
  searchCarsForm: FormGroup;
  
  Enterprise: RentACarEnterprise;
  id: number;
  minDate = undefined;
  slides: any = [[]];
  companyLocationFrom: boolean = false;
  companyLocationTo: boolean = false;
  branchLocationFrom: boolean = false;
  branchLocationTo: boolean = false;
  formatedDates: string[] = []; //ovo koristim sada samo zbog lakse provere kod rezervacije, kasnije ce biti niz tipa Date
 
  datesBetween: Date[] = [];
  numberOfDays: number;
  searchedCars: Car[] = [];
 
  constructor(private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal, public datepipe: DatePipe) { 
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
    this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
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
    let carPlacePickUp = "";
    let carPlaceReturn = "";
    let dateFrom = "";
    let dateTo = "";
    let carType = "";
    let carNumberOfPassengers = "";
    let carPriceFrom = "";
    let carPriceTo = "";
    
    this.searchCarsForm = new FormGroup({
      carPlacePickUp: new FormControl(carPlacePickUp, Validators.required),
      carPlaceReturn: new FormControl(carPlaceReturn, Validators.required),
      dateFrom: new FormControl(dateFrom, Validators.required),
      dateTo: new FormControl(dateTo, Validators.required),
      carType: new FormControl(carType, Validators.required),
      carNumberOfPassengers: new FormControl(carNumberOfPassengers, Validators.required),
      carPriceFrom: new FormControl(''),
      carPriceTo: new FormControl('')
    });
  }
  searchCars(){ 
    var carPlacePickUp = this.searchCarsForm.value.carPlacePickUp;
    var carPlaceReturn = this.searchCarsForm.value.carPlaceReturn;
    //var dateFrom = this.searchCarsForm.value.dateFrom; 
    //var dateTo = this.searchCarsForm.value.dateTo; 
    var carType = this.searchCarsForm.value.carType; 
    var carNumberOfPassengers = this.searchCarsForm.value.carNumberOfPassengers; 
    var carPriceFrom = this.searchCarsForm.value.carPriceFrom; 
    var carPriceTo = this.searchCarsForm.value.carPriceTo;

   
    var dateFrom = new Date(this.searchCarsForm.value.dateFrom.year,this.searchCarsForm.value.dateFrom.month -1,
      this.searchCarsForm.value.dateFrom.day);
    

   
    var dateTo = new Date(this.searchCarsForm.value.dateTo.year,this.searchCarsForm.value.dateTo.month -1,
      this.searchCarsForm.value.dateTo.day);
  
   
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    var start  = dateFrom.getTime();
    var end = dateTo.getTime();
    var numberOfDays = Math.ceil((end - start) / MS_PER_DAY);


    this.datesBetween = Array.from(new Array(numberOfDays + 1), 
    (v, i) => new Date(start + (i * MS_PER_DAY)));
    

    //ovaj for ispod, sa formatiranim datumima, koristim samo zbog lakseg testiranja
    for(let i: number = 0; i < this.datesBetween.length; i++){
        this.formatedDates.push(this.datepipe.transform(this.datesBetween[i], 'dd-MM-yyyy'));
    }

    
    
    

    if(this.Enterprise.EnterpriseAddress.City.toLowerCase() == carPlacePickUp.toLowerCase()){
      this.companyLocationFrom = true;   
    }

    if(this.Enterprise.EnterpriseAddress.City.toLowerCase() == carPlaceReturn.toLowerCase()){
      this.companyLocationTo = true;
    }

    for(let i: number = 0; i < this.Enterprise.EnterpriseBranchs.length; i++){
      if(this.Enterprise.EnterpriseBranchs[i].BranchAddress.City.toLowerCase() == carPlacePickUp.toLowerCase()){
        this.branchLocationFrom = true;
      }
      if(this.Enterprise.EnterpriseBranchs[i].BranchAddress.City.toLowerCase() == carPlaceReturn.toLowerCase()){
        this.branchLocationTo = true;
      }
    }

    if((this.companyLocationFrom == true || this.branchLocationFrom == true) && (this.companyLocationTo == true || this.branchLocationTo == true)){
      for(let i: number = 0; i < this.Enterprise.EnterpriseCars.length; i++){
        if((carType.toLowerCase() != this.Enterprise.EnterpriseCars[i].CarType.toLowerCase()) || parseInt(carNumberOfPassengers) > this.Enterprise.EnterpriseCars[i].CarNumberOfSeats){
          continue;
        }
        
        for(let j: number = 0; j < this.Enterprise.EnterpriseCars[i].CarRentedDates.length; j++){
          for(let k: number = 0; k < this.formatedDates.length; k++){
            if(this.Enterprise.EnterpriseCars[i].CarRentedDates[j] == this.formatedDates[k]){
              var rented = true;
            }
          }
        }
    
        if(rented){
          rented = false;
          continue;
        }
        
        if (carPriceFrom != "" || carPriceFrom != null){
          if(parseInt(carPriceFrom) > this.Enterprise.EnterpriseCars[i].CarPrice){
              continue;
          }
        }
      
        if(carPriceTo != "" || carPriceTo != null){
          if(parseInt(carPriceTo) < this.Enterprise.EnterpriseCars[i].CarPrice){
              continue;
          }
        }

        this.searchedCars.push(this.Enterprise.EnterpriseCars[i]);
      }
    }
  

    this.slides = this.chunk(this.searchedCars, 3);
    this.searchedCars = [];
    this.companyLocationFrom = false;
    this.companyLocationTo = false;
    this.branchLocationFrom = false;
    this.branchLocationTo = false;
    this.datesBetween = [];
    this.formatedDates = [];
  
  }

  openCarDetailsModal(carId: number, enterpriseId: number){
    const modalRef = this.modalService.open(RentACarDetailsModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneCar(carId, enterpriseId);
  }
  

}
