import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AdminAddParameters } from 'src/app/Shared/Model/Common/AdminAddParameters.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminServiceService } from '../../Services/AdminService/admin-service.service';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAdminAddParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminAddParameters.model';

@Component({
  selector: 'app-add-system-admin-modal',
  templateUrl: './add-system-admin-modal.component.html',
  styleUrls: ['./add-system-admin-modal.component.css']
})
export class AddSystemAdminModalComponent implements OnInit {

  @Input()
  item:number;
  constructor(private routeService: Router, private toaster: ToastrService, private adminService: AdminServiceService,private service: ValidationService, public activeModal : NgbActiveModal) { }

  ret;
  AddParameters: AdminAddParameters;
  registerForm : FormGroup;
  ngOnInit(): void {
    this.setForm();
    this.registerForm.controls.password.valueChanges.subscribe(
      x=> this.registerForm.controls.repeatedPassword.updateValueAndValidity()
    )
  }

  setForm(){
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, this.service.lettersValidator]),
      lastName: new FormControl('', [Validators.required, this.service.lettersValidator]),
      eMail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, this.service.phoneValidator]),
      city: new FormControl('', [Validators.required, this.service.lettersValidator]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [Validators.required, this.service.passwordValidator])
  
    })
  }
  addAdmin(){
    this.AddParameters = new AdminAddParameters();


    this.AddParameters.name = this.registerForm.value.firstName;
    this.AddParameters.lastName = this.registerForm.value.lastName;
    this.AddParameters.eMail = this.registerForm.value.eMail;
    this.AddParameters.city = this.registerForm.value.city;
    this.AddParameters.password = this.registerForm.value.password;
    this.AddParameters.phoneNumber = this.registerForm.value.phone;
    this.AddParameters.username = this.registerForm.value.username;

    this.adminService.addSystemAdmin(this.AddParameters).subscribe(i=>{
      this.ret = i;

      this.toaster.success("Add operation been successfully executed. ",'Add a system admin',{
        timeOut : 3000
      })

     
      this.activeModal.close();
    })
  }

}
