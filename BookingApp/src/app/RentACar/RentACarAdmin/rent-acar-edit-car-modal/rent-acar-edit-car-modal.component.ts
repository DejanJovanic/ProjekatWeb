import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { CarService } from '../../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';
import { EditCarParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditCarParameters.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rent-acar-edit-car-modal',
  templateUrl: './rent-acar-edit-car-modal.component.html',
  styleUrls: ['./rent-acar-edit-car-modal.component.css']
})
export class RentACarEditCarModalComponent implements OnInit {
  
  editCarForm: FormGroup;
  minDate = undefined;
  return;
  @Input()
  item : Car
  constructor(private routeService: Router, private toaster: ToastrService, private carService: CarService,private service: ValidationService, public activeModal : NgbActiveModal) { 
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
      CarBrand: new FormControl(this.item.brand, [Validators.required, this.service.lettersValidator]),
      CarModel: new FormControl(this.item.model, [Validators.required, this.service.lettersAndNumbers]),
      CarYearOfProduction: new FormControl(this.item.yearOfProduction, [Validators.required, this.service.numbersValidator, this.service.yearOfProductionValidator]),
      CarType: new FormControl('', Validators.required),
      CarFuelType: new FormControl('', Validators.required),
      CarTransmissionType: new FormControl('', Validators.required),
      CarNumberOfSeats: new FormControl('', Validators.required),
      CarPrice: new FormControl(this.item.price, [Validators.required, this.service.numbersValidator])
  
      
    });
  }

  editCar(){
    
    var parameters = new EditCarParameters();
    parameters.enterpriseId = this.item.enterpriseId;
    parameters.carId = this.item.id;
    parameters.brand = this.editCarForm.value.CarBrand;
    parameters.fuelType = this.editCarForm.value.CarFuelType;
    parameters.model = this.editCarForm.value.CarModel;
  
    parameters.type = this.editCarForm.value.CarType;
    parameters.yearOfProduction = this.editCarForm.value.CarYearOfProduction;
    parameters.transmissionType = this.editCarForm.value.CarTransmissionType;
    parameters.numberOfSeats = this.editCarForm.value.CarNumberOfSeats;
    parameters.price = this.editCarForm.value.CarPrice;
    parameters.price = parameters.price.toString();
    parameters.yearOfProduction = parameters.yearOfProduction.toString();

    this.carService.editCar(parameters).subscribe(i =>{
      this.return = i;
      
      this.toaster.success("Edit operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Edit a car',{
        timeOut : 2000
      })

      setTimeout(() => {
        this.routeService.navigate(['RentACarEnterpriseAdmin']);
    }, 3000); 
      this.activeModal.close();
    })
    
  
   
  }

}
