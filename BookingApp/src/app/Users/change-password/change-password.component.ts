import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { UserLoginService } from '../Services/UserLogin/user-login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form : FormGroup
  constructor(private network : UserLoginService,private builder : FormBuilder,private router : Router,private toast : ToastrService) { }
  private samePasswordValidator : ValidatorFn = (fg: FormGroup) => {
    const newPass = fg.get('newPassword').value;
    const newPassAgain = fg.get('newPasswordAgain').value;
    if(newPass && newPassAgain)
      return newPass === newPassAgain ? null : {samePasswords : true};
    return  {samePasswords : true};
  }
  ngOnInit(): void {
    this.form = this.builder.group({
      oldPassword : ['',[Validators.required]],
      newPassword : ['',[Validators.required]],
      newPasswordAgain : ['',[Validators.required]],
    },{validators : [this.samePasswordValidator]})
  }

  OnSubmit(){
    if(this.form.valid){
      this.network.ChangePassword("dejanAdmin",this.form.value.oldPassword,this.form.value.newPassword).subscribe(i =>{
        this.toast.success("Password successfully changed");
        this.router.navigate(['/Login'])
      })
    }
  }

}
