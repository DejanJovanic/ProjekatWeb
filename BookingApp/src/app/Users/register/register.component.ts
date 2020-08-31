import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/RentACar/Services/ValidationService/validation.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private service: ValidationService,private client : HttpClient,private toast : ToastrService,private router : Router) { 
    
  }

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
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[+]?([0-9]{1,12})$/)]),
      city: new FormControl('', [Validators.required, this.service.lettersValidator]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [Validators.required, this.service.passwordValidator])
  
    })
  }

  OnSubmit(){
    if(this.registerForm.valid){
      this.client.post('http://localhost:50000/api/User',{
        username : this.registerForm.value.username,
        lastName : this.registerForm.value.lastName,
        name : this.registerForm.value.rname,
        city : this.registerForm.value.city,
        password : this.registerForm.value.password,
        phoneNumber : this.registerForm.value.phone,
        email : this.registerForm.value.eMail
      }).subscribe(i =>{
        if(i){
          this.toast.success('Account successfully created. Validation link is sent to provided email.')
          this.router.navigate(['/Login'])
        }
      })
    }
  }
  

}
