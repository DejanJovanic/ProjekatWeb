import { Component, OnInit, Input } from '@angular/core';
import { AdminServiceService } from '../../Services/AdminService/admin-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RentACarAdminEditProfile } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminEditProfile.model';
import { RentACarAdmin } from 'src/app/Shared/Model/RentACars/RentACarAdmin.model';

@Component({
  selector: 'app-rent-acar-admin-edit-info',
  templateUrl: './rent-acar-admin-edit-info.component.html',
  styleUrls: ['./rent-acar-admin-edit-info.component.css']
})
export class RentACarAdminEditInfoComponent implements OnInit {
  ret;
  username: string;
  @Input()
  item: string;
 
  constructor(private routeService: Router, private toaster: ToastrService, private adminService: AdminServiceService,private service: ValidationService, public activeModal : NgbActiveModal) { }

  registerForm : FormGroup;
  ngOnInit(): void {
    this.username = localStorage["username"];

    this.adminService.getRentACarAdminAsync(this.username).subscribe(i =>{
      this.ret = i;
      
      this.setForm();
    })
    
    
  }

  setForm(){
    this.registerForm = new FormGroup({
      firstName: new FormControl(this.ret.name, [Validators.required, this.service.lettersValidator]),
      lastName: new FormControl(this.ret.lastName, [Validators.required, this.service.lettersValidator]),
      phone: new FormControl(this.ret.phoneNumber, [Validators.required, this.service.phoneValidator]),
      city: new FormControl(this.ret.city, [Validators.required, this.service.lettersValidator]),
     
  
    })
  }

  editProfile(){
    var parameters = new RentACarAdminEditProfile();

    parameters.firstName = this.registerForm.value.firstName;
    parameters.lastName = this.registerForm.value.lastName;
    parameters.phoneNumber = this.registerForm.value.phone;
    parameters.city = this.registerForm.value.city;
    parameters.username = this.username;

    this.adminService.editAdminProfile(parameters).subscribe(i =>{
      this.ret = i;

      this.toaster.success("Edit operation been successfully executed.",'Edit profile',{
        timeOut : 2000
      })

      this.activeModal.close();
    })
  }

}
