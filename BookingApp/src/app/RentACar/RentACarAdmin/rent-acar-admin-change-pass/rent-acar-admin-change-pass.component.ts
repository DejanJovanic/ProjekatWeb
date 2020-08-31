import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../Services/AdminService/admin-service.service';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordChange } from 'src/app/Shared/Model/RentACars/Models/Parameters/PasswordChange.model';

@Component({
  selector: 'app-rent-acar-admin-change-pass',
  templateUrl: './rent-acar-admin-change-pass.component.html',
  styleUrls: ['./rent-acar-admin-change-pass.component.css']
})
export class RentACarAdminChangePassComponent implements OnInit {

  ret;
  username: string;
  constructor(private routeService: Router, private toaster: ToastrService, private adminService: AdminServiceService,private service: ValidationService, public activeModal : NgbActiveModal) { }

  registerForm : FormGroup;
  ngOnInit(): void {
    this.username = localStorage["username"];
    this.setForm();
    this.registerForm.controls.password.valueChanges.subscribe(
      x=> this.registerForm.controls.repeatedPassword.updateValueAndValidity()
    )
  }

  setForm(){
    this.registerForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [Validators.required, this.service.passwordValidator])
      
  
    })
  }

  changePass(){
    var parameters = new PasswordChange();

    parameters.username = this.username;
    parameters.password = this.registerForm.value.oldPassword;
    parameters.newPassword = this.registerForm.value.password;

    this.adminService.changePassword(parameters).subscribe(i =>{
      this.ret = i;

      this.toaster.success("Change password operation successfully executed.",'Change password',{
        timeOut : 2000
      })

      this.activeModal.close();
    })

  }

}
