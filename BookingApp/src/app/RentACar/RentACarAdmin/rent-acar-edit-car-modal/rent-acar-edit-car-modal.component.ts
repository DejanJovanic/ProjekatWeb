import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(public activeModal : NgbActiveModal) { 
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
      CarBrand: new FormControl(this.item.CarBrand, [Validators.required, this.lettersValidator]),
      CarModel: new FormControl(this.item.CarModel, [Validators.required, this.lettersAndNumbers]),
      CarYearOfProduction: new FormControl(this.item.CarYearOfProduction, [Validators.required, this.numbersValidator, this.yearOfProductionValidator]),
      CarType: new FormControl('', Validators.required),
      CarFuelType: new FormControl('', Validators.required),
      CarTransmissionType: new FormControl('', Validators.required),
      CarNumberOfSeats: new FormControl('', Validators.required),
      CarPrice: new FormControl(this.item.CarPrice, [Validators.required, this.numbersValidator])
  
      
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
  lettersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$');

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
}
