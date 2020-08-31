import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../Services/CarService/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-delete-car-modal',
  templateUrl: './rent-acar-delete-car-modal.component.html',
  styleUrls: ['./rent-acar-delete-car-modal.component.css']
})
export class RentACarDeleteCarModalComponent implements OnInit {
  return;
  @Input()
  item : Car;
  constructor(private routeService: Router, private toaster: ToastrService, private carService: CarService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteCar(){
    
    this.carService.deleteCar(this.item.enterpriseId, this.item.id).subscribe(i =>{

      this.return = i;
      this.toaster.success("Delete operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Delete a car',{
        timeOut : 2000
      })
      this.activeModal.close();
      setTimeout(() => {
        this.routeService.navigate(['RentACarEnterpriseAdmin']);
    }, 3000);  
   
      
    })
  }

}
