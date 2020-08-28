import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';

@Component({
  selector: 'app-rent-acar-edit-car-modal',
  templateUrl: './rent-acar-edit-car-modal.component.html',
  styleUrls: ['./rent-acar-edit-car-modal.component.css']
})
export class RentACarEditCarModalComponent implements OnInit {
  alert: boolean = false;
  editCarForm: FormGroup;
  minDate = undefined;
  @Input()
  item : Car
  constructor(private service: ValidationService, public activeModal : NgbActiveModal) { 
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
   
    this.editCarForm = new FormGroup({
      CarBrand: new FormControl(this.item.CarBrand, [Validators.required, this.service.lettersValidator]),
      CarModel: new FormControl(this.item.CarModel, [Validators.required, this.service.lettersAndNumbers]),
      CarYearOfProduction: new FormControl(this.item.CarYearOfProduction, [Validators.required, this.service.numbersValidator, this.service.yearOfProductionValidator]),
      CarType: new FormControl('', Validators.required),
      CarFuelType: new FormControl('', Validators.required),
      CarTransmissionType: new FormControl('', Validators.required),
      CarNumberOfSeats: new FormControl('', Validators.required),
      CarPrice: new FormControl(this.item.CarPrice, [Validators.required, this.service.numbersValidator])
  
      
    });
  }

  closeAlert(){
    this.alert= false;
  }


  editCar(){
    var brand = this.editCarForm.value.CarBrand;
    var model = this.editCarForm.value.CarModel;
    var year = this.editCarForm.value.CarYearOfProduction;
    var type = this.editCarForm.value.CarType;
    var fuel = this.editCarForm.value.CarFuelType;
    var transmission = this.editCarForm.value.CarTransmissionType;
    var seatsNo = this.editCarForm.value.CarNumberOfSeats;
    var price = this.editCarForm.value.CarPrice;
    


   
    this.alert = true;
  }

}
