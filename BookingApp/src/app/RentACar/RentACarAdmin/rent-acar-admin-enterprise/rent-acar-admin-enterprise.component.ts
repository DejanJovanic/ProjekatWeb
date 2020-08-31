import { Component, OnInit } from '@angular/core';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { RentACarAdmin } from 'src/app/Shared/Model/RentACars/RentACarAdmin.model';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { UserNetworkService } from 'src/app/Users/Services/UserNetwork/user-network.service';
import { Router } from '@angular/router';
import { RentACarEnterpriseEditModalComponent } from '../rent-acar-enterprise-edit-modal/rent-acar-enterprise-edit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminServiceService } from '../../Services/AdminService/admin-service.service';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';

@Component({
  selector: 'app-rent-acar-admin-enterprise',
  templateUrl: './rent-acar-admin-enterprise.component.html',
  styleUrls: ['./rent-acar-admin-enterprise.component.css']
})
export class RentACarAdminEnterpriseComponent implements OnInit {
  EnterpriseRatingArr=[];
  animeArr=[];
  isHalf = false;

  Admin;
  Enterprise;
  constructor(private enterpriseService: EnterpriseService, private modalService : NgbModal, private router : Router, private adminService: AdminServiceService, private userNetwork: UserNetworkService, private user : UserCacheService) { 

    
  }

  ngOnInit(): void {
    if(this.user.currentUser == null){
      this.userNetwork.GetUserDetails().subscribe(i=> {this.Admin = i as RentACarAdmin});
    }
    else{
    this.Admin = this.user.currentUser as RentACarAdmin;
    }
    
    /*this.adminService.getRentACarAdminAsync(this.Admin.).subscribe(i =>{
      this.Enterprise = i;
     
    this.rating = 0;
    for(let j = 0; j < this.Enterprise.rating.length; j++){
      this.rating = this.rating + this.Enterprise.rating[j].rating;
    }

    this.rating = Math.ceil(this.rating / this.Enterprise.rating.length);
   
      this.updateStars();
      this.getArrayValues(0);
      
      this.toaster.success("Your request has been successfully executed",'Enterprise profile',{
        timeOut : 3000
      })
    
    })*/
  }

   updateStars() {
    this.isHalf = this.Enterprise.EnterpriseRating %1 !== 0? true : false;
    for(let i=0; i<this.Enterprise.EnterpriseRating;i++){
      this.EnterpriseRatingArr.push(i)
    }
   
  }
 getArrayValues(index) {
    setInterval(() => {
      if(index == this.EnterpriseRatingArr.length)
        return;
      this.animeArr.push(this.EnterpriseRatingArr[index]);
      index++;
    }, 50);
  }

  AdminLogout(){
    localStorage.clear();
    this.router.navigateByUrl('/Login', {skipLocationChange: true})
    .then(() => this.router.navigate(['/main/Airlines']));
   this.user.currentUser = null;

   
  }

  /*openEnterpriseEditModal(){
    this.enterpriseService.getOneEnterprise(this.id).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarEnterpriseEditModalComponent);
      this.Enterprise = i;
      this.toaster.success("Your request has been successfully executed",'Edit profile',{
        timeOut : 3000
      })
     
      
      modalRef.componentInstance.item = this.Enterprise2;
    })
  
  }*/
}
