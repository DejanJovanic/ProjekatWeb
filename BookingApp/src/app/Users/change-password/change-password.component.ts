import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { UserLoginService } from '../Services/UserLogin/user-login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form : FormGroup
  constructor(private background : BackgroundService,private network : UserLoginService,private builder : FormBuilder,private router : Router,private toast : ToastrService,private route : ActivatedRoute) { }
  private samePasswordValidator : ValidatorFn = (fg: FormGroup) => {
    const newPass = fg.get('newPassword').value;
    const newPassAgain = fg.get('newPasswordAgain').value;
    if(newPass && newPassAgain)
      return newPass === newPassAgain ? null : {samePasswords : true};
    return  {samePasswords : true};
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.UserRegistration);
  });
    this.form = this.builder.group({
      oldPassword : ['',[Validators.required]],
      newPassword : ['',[Validators.required]],
      newPasswordAgain : ['',[Validators.required,Validators.minLength(8)]],
    },{validators : [this.samePasswordValidator]})
  }

  OnSubmit(){
    if(this.form.valid){
      this.network.ChangePassword(this.route.snapshot.params.username,this.form.value.oldPassword,this.form.value.newPassword).subscribe(i =>{
        this.toast.success("Password successfully changed");
        this.router.navigate(['/Login'])
      })
    }
  }

}
