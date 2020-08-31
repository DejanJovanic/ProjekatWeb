import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { AdminServiceService } from '../../Services/AdminService/admin-service.service';
import { DiscountBasedOnPoints } from 'src/app/Shared/Model/RentACars/Models/DiscountBasedOnPoints.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-define-discount-modal',
  templateUrl: './admin-define-discount-modal.component.html',
  styleUrls: ['./admin-define-discount-modal.component.css']
})
export class AdminDefineDiscountModalComponent implements OnInit {
ret;
  registerForm : FormGroup;
  constructor(private toaster: ToastrService, public adminService : AdminServiceService, public service: ValidationService, public activeModal : NgbActiveModal, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm() {
    this.registerForm = new FormGroup({
      discount: new FormControl('', [Validators.required, this.service.numbersValidator, this.service.percentageValidator])
      
  
    })
  }

  addDiscount(){
    var parameters = new DiscountBasedOnPoints();
    parameters.discount = this.registerForm.value.discount;
    this.adminService.setDiscountBasedOnPoints(parameters).subscribe(i =>{
      this.ret = i;
      this.toaster.success("Add operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Add a branch',{
        timeOut : 3000
      })

      this.activeModal.close();
    })
  }

}
