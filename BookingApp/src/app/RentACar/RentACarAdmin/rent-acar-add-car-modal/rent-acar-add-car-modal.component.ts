import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';

@Component({
  selector: 'app-rent-acar-add-car-modal',
  templateUrl: './rent-acar-add-car-modal.component.html',
  styleUrls: ['./rent-acar-add-car-modal.component.css']
})
export class RentACarAddCarModalComponent implements OnInit {

  alert: boolean = false;
  addCarForm: FormGroup;
  minDate = undefined;
  @Input()
  item : RentACarEnterprise

  
  constructor(public activeModal : NgbActiveModal, private service: ValidationService) {
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

  closeAlert(){
    this.alert= false;
  }

  addCar(){
    var brand = this.addCarForm.value.CarBrand;
    var model = this.addCarForm.value.CarModel;
    var year = this.addCarForm.value.CarYearOfProduction;
    var type = this.addCarForm.value.CarType;
    var fuel = this.addCarForm.value.CarFuelType;
    var transmission = this.addCarForm.value.CarTransmissionType;
    var seatsNo = this.addCarForm.value.CarNumberOfSeats;
    var price = this.addCarForm.value.CarPrice;
   

    this.alert = true;
  }

 

 

}
