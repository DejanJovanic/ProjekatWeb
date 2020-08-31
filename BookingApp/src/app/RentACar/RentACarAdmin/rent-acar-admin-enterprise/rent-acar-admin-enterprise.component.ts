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
import { ToastrService } from 'ngx-toastr';
import { RentACarAdminEditProfile } from 'src/app/Shared/Model/RentACars/Models/Parameters/RentACarAdminEditProfile.model';
import { RentACarAdminEditInfoComponent } from '../rent-acar-admin-edit-info/rent-acar-admin-edit-info.component';
import { RentACarAdminChangePassComponent } from '../rent-acar-admin-change-pass/rent-acar-admin-change-pass.component';

@Component({
  selector: 'app-rent-acar-admin-enterprise',
  templateUrl: './rent-acar-admin-enterprise.component.html',
  styleUrls: ['./rent-acar-admin-enterprise.component.css']
})
export class RentACarAdminEnterpriseComponent implements OnInit {
  EnterpriseRatingArr=[];
  animeArr=[];
  name: string;
  description: string;
  address: string;
  counter;
  id: number;
  rating: number;
  isHalf = false;
  Admin;
  ret;
  Enterprise;
  username: string;
  constructor(private toaster: ToastrService, private enterpriseService: EnterpriseService, private modalService : NgbModal, private router : Router, private adminService: AdminServiceService, private userNetwork: UserNetworkService, private user : UserCacheService) { 

    
  }

  ngOnInit(): void {
    this.username = localStorage["username"];
    
    this.adminService.getRentACarAdminAsync(this.username).subscribe(i =>{
      this.Admin = i;
      this.enterpriseService.getOneEnterprise(this.Admin.enterpriseId).subscribe(i =>{
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
        this.id = this.Admin.enterpriseId;
        this.name = this.Enterprise.name;
        this.description = this.Enterprise.description;
        this.address = this.Enterprise.address.street + " " + this.Enterprise.address.streetNo + " " + this.Enterprise.address.zipCode + " " + this.Enterprise.address.city + ", " + this.Enterprise.address.country;
      })
     
    })
  
  
  }

  
   updateStars() {
    this.isHalf = this.rating %1 !== 0? true : false;
    for(let i=0; i<this.rating;i++){
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

  openEnterpriseEditModal(){
    this.enterpriseService.getOneEnterprise(this.id).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarEnterpriseEditModalComponent);
      this.Enterprise = i;
      this.toaster.success("Your request has been successfully executed",'Edit enterprise profile',{
        timeOut : 3000
     })
     
      
      modalRef.componentInstance.item = this.Enterprise;
    })
  
  }

  openAdminProfileEdit(){
   
      const modalRef = this.modalService.open(RentACarAdminEditInfoComponent);
     
     
      
      modalRef.componentInstance.item = this.username;
    
  }
  changePass(){
    const modalRef = this.modalService.open(RentACarAdminChangePassComponent);
  }
}
