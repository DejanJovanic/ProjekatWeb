import { Component, OnInit, Input } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

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
   
    this.addCarForm = new FormGroup({
      CarBrand: new FormControl('', [Validators.required, this.lettersValidator]),
      CarModel: new FormControl('', [Validators.required, this.lettersAndNumbers]),
      CarYearOfProduction: new FormControl('', [Validators.required, this.numbersValidator, this.yearOfProductionValidator]),
      CarType: new FormControl('', Validators.required),
      CarFuelType: new FormControl('', Validators.required),
      CarTransmissionType: new FormControl('', Validators.required),
      CarNumberOfSeats: new FormControl('', Validators.required),
      CarPrice: new FormControl('', [Validators.required, this.numbersValidator])
      
      
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
