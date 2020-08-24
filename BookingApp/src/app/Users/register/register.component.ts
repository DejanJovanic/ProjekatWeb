import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor() { 
    this.registerForm.controls.password.valueChanges.subscribe(
      x=> this.registerForm.controls.repeatedPassword.updateValueAndValidity()
    )
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(){
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, this.lettersValidator]),
      lastName: new FormControl('', [Validators.required, this.lettersValidator]),
      eMail: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, this.phoneValidator]),
      city: new FormControl('', [Validators.required, this.lettersValidator]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      repeatedPassword: new FormControl('', [Validators.required, this.passwordValidator])
  
    })
  }
  phoneValidator(control: AbstractControl){

      if(control && control.value !== null || control.value !== undefined){
        const regex = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./]{1}[0-9]{3}[-\s\./]{1}[0-9]{2}[-\s\./]{1}[0-9]{2}$');

        if(!regex.test(control.value)){
          return{
            isError: true
          };
        }
      }
      return null;
  }

  lettersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

  passwordValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const repeatedPassword = control.value;

      const passControl = control.root.get('password');

      if(passControl){
        const password = passControl.value;

          if(password !== repeatedPassword || password === ''){
            return{
              isError: true
            };
          }
      }
    }

    return null;
  }

}
