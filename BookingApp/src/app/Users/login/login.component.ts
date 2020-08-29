import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserLoginService } from '../Services/UserLogin/user-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserLoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(private service : UserLoginService, private router : Router, private activeRoute : ActivatedRoute) { }

  ngOnInit(): void {
   this.setForm();
  }

  setForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
  
    })
  }
  onSubmit(){
    this.service.username = this.loginForm.value.username;

    this.service.Login(this.loginForm.value.username,this.loginForm.value.password).subscribe(i =>{
      if(i != null){
        localStorage["username"] = this.loginForm.value.username;

        if(localStorage["Role"] == "RentACarAdmin"){
          this.router.navigate(['RentACarEnterpriseAdmin']);
        }
        else{
        this.router.navigate(['/main']);
        }
      }
    },
      error =>{
        if(error instanceof HttpErrorResponse && error.error.message == "PasswordChangeRequired")
          this.router.navigate(['/changePassword/',this.loginForm.value.username]);
      }
    )
  }
}
