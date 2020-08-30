import { Component, OnInit } from '@angular/core';
import { UserNetworkService } from '../Services/UserNetwork/user-network.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BackgroundService } from 'src/app/Shared/Services/Background/background.service';
import { ToastrService } from 'ngx-toastr';
import { Background } from 'src/app/Shared/Model/Common/Background.model';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit {

  constructor(private service : UserNetworkService,private route : ActivatedRoute,private router : Router,private background : BackgroundService,private toast : ToastrService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.background.SetBackgroud(Background.None);
  });
  this.route.queryParams.subscribe(i =>{
    let token = i['token']
    let username = i['username']
    this.service.ValidateUser(token,username).subscribe(i =>{
      if(i){
        this.toast.success('Account successfully confirmed');
        this.router.navigate(['/Login'])
      }
    })
  })
   
  }

}
