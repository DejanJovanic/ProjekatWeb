import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { Car } from 'src/app/Shared/Model/RentACars/Car.model';
import { RentACarDetailsModalComponent } from '../../RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from '../../Services/CarService/car.service';
import { ToastrService } from 'ngx-toastr';
import { RentACarDiscountDetailsComponent } from '../../rent-acar-discount-details/rent-acar-discount-details.component';

@Component({
  selector: 'app-rent-acar-discounts',
  templateUrl: './rent-acar-discounts.component.html',
  styleUrls: ['./rent-acar-discounts.component.css']
})
export class RentACarDiscountsComponent implements OnInit {

  id: number;
  Enterprise: RentACarEnterprise;
  slides: any = [[]];
  carsOnDiscount: Car[] = [];
  Cars;
  Car;
  constructor(private carService: CarService, private toaster: ToastrService, private routeService: Router, private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute, private modalService : NgbModal) { }

  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
     
    });

    this.carService.getAllCarsOnDiscount(this.id).subscribe(i =>{
      this.Cars = i;
      this.toaster.success("Your request has been successfully executed",'Cars on discount',{
        timeOut : 2000
      })
      this.slides = this.chunk(this.Cars, 3);
    })
    
  }

  
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  openCarOnDiscountDetailsModal(carId: number){
    this.carService.getOneCarOnDiscount(this.id, carId).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarDiscountDetailsComponent);
      this.Car = i;
      this.toaster.success("Your request has been successfully executed",'Car details',{
        timeOut : 3000
      })
      this.Car.enterpriseId = this.id;
      
      modalRef.componentInstance.item = this.Car;
    })
  }

}
