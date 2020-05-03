import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserLoginService } from '../Services/UserLogin/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserLoginService]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  constructor(private builder : FormBuilder,private service : UserLoginService, private router : Router) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username : '',
      password : ''
    })
  }

  onSubmit(){
    this.service.Login(this.loginForm.value.username,this.loginForm.value.password).subscribe(i =>{
      if(i != null){
        sessionStorage["username"] = this.loginForm.value.username;
        this.router.navigate(['/main']);
      }
    })
  }

}
