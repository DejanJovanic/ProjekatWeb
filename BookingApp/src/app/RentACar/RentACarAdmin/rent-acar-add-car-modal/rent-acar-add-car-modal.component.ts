import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { AddCarParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddCarParameters.model';
import { CarService } from '../../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rent-acar-add-car-modal',
  templateUrl: './rent-acar-add-car-modal.component.html',
  styleUrls: ['./rent-acar-add-car-modal.component.css']
})
export class RentACarAddCarModalComponent implements OnInit {

  alert: boolean = false;
  addCarForm: FormGroup;
  minDate = undefined;
  return;
  @Input()
  item : number

  
  constructor(private toaster: ToastrService,private carService: CarService, public activeModal : NgbActiveModal, private service: ValidationService) {
    const current = new Date();
    this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
    };
   }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
   
    this.addCarForm = new FormGroup({
      CarBrand: new FormControl('', [Validators.required, this.service.lettersValidator]),
      CarModel: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      CarYearOfProduction: new FormControl('', [Validators.required, this.service.numbersValidator, this.service.yearOfProductionValidator]),
      CarType: new FormControl('', Validators.required),
      CarFuelType: new FormControl('', Validators.required),
      CarTransmissionType: new FormControl('', Validators.required),
      CarNumberOfSeats: new FormControl('', Validators.required),
      CarPrice: new FormControl('', [Validators.required, this.service.numbersValidator])
      
      
    });
  }



  addCar(){
  
    var parameters = new AddCarParameters();
    parameters.enterpriseId = this.item;
    
    parameters.brand = this.addCarForm.value.CarBrand;
    parameters.fuelType = this.addCarForm.value.CarFuelType;
    parameters.model = this.addCarForm.value.CarModel;
  
    parameters.type = this.addCarForm.value.CarType;
    parameters.yearOfProduction = this.addCarForm.value.CarYearOfProduction;
    parameters.transmissionType = this.addCarForm.value.CarTransmissionType;
    parameters.numberOfSeats = this.addCarForm.value.CarNumberOfSeats;
    parameters.price = this.addCarForm.value.CarPrice;
    console.log(parameters);
    this.carService.addCar(parameters).subscribe(i =>{
      this.return = i;
      
      this.toaster.success("Add car has been successfully executed",'Add a car',{
        timeOut : 3000
      })
    
    })
    
  }

 

 

}
