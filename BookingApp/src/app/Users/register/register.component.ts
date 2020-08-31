import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/RentACar/Services/ValidationService/validation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private service: ValidationService) { 
    
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
      phone: new FormControl('', [Validators.required, this.service.phoneValidator]),
      city: new FormControl('', [Validators.required, this.service.lettersValidator]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required,  Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [Validators.required, this.service.passwordValidator])
  
    })
  }
  

}
