import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rent-acar-set-discount-modal',
  templateUrl: './rent-acar-set-discount-modal.component.html',
  styleUrls: ['./rent-acar-set-discount-modal.component.css']
})
export class RentACarSetDiscountModalComponent implements OnInit {

  @Input()
  item : Car;
  alert: boolean = false;
  setDiscountForm: FormGroup;
  minDate = undefined;
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
    this.setDiscountForm = new FormGroup({
      DiscountFrom: new FormControl('', Validators.required),
      DiscountTo:new FormControl('', Validators.required),
      DiscountPrice:new FormControl('', [Validators.required, this.numbersValidator])
    })
  }

  setDiscount(){
    this.alert = true;
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

  closeAlert(){
    this.alert= false;
  }
}
