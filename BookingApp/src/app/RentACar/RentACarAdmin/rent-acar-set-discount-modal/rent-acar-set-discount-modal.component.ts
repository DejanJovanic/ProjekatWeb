import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { CarService } from '../../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';
import { Discount } from 'src/app/Shared/Model/RentACars/Models/Discount.model';
import { SetDiscountParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SetDiscountParameters.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-set-discount-modal',
  templateUrl: './rent-acar-set-discount-modal.component.html',
  styleUrls: ['./rent-acar-set-discount-modal.component.css']
})
export class RentACarSetDiscountModalComponent implements OnInit {

  @Input()
  item : Car;
  
 
  return;
  setDiscountForm: FormGroup;
  minDate = undefined;
  constructor(private routeService : Router, private carService: CarService, private toaster: ToastrService, private service: ValidationService, public activeModal : NgbActiveModal) {
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
      DiscountFrom: new FormControl('', [Validators.required, this.service.firstDateValidator]),
      DiscountTo:new FormControl('', [Validators.required, this.service.secondDateValidator]),
      DiscountPrice:new FormControl('', [Validators.required, this.service.numbersValidator])
    })
  }

  setDiscountt(){
    var discount = new SetDiscountParameters();
    discount.discountFrom = new Date(this.setDiscountForm.value.DiscountFrom.year,this.setDiscountForm.value.DiscountFrom.month -1,
      this.setDiscountForm.value.DiscountFrom.day);
    discount.discountTo = new Date(this.setDiscountForm.value.DiscountTo.year,this.setDiscountForm.value.DiscountTo.month -1,
      this.setDiscountForm.value.DiscountTo.day);
    discount.discount = this.setDiscountForm.value.DiscountPrice;
    discount.carId = this.item.id;
    discount.enterpriseId = this.item.enterpriseId;
    

    
    this.carService.createDiscount(discount).subscribe(i =>{
      this.return = i;

      this.toaster.success("Set discount operation has been successfully executed. You will be redirected on enterprise profile in 3 seconds.",'Set discount',{
        timeOut : 2000
      })

      setTimeout(() => {
        this.routeService.navigate(['RentACarEnterpriseAdmin']);
    }, 3000); 

      this.activeModal.close();
    })
    
    
  }
  

  

  
}
