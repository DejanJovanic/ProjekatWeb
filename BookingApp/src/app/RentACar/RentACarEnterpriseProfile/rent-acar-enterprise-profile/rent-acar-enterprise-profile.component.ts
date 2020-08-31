import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ToastrService } from 'ngx-toastr';
import { RentACarEnterpriseEditModalComponent } from '../../RentACarAdmin/rent-acar-enterprise-edit-modal/rent-acar-enterprise-edit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddRentACarAdminModalComponent } from '../../RentACarAdmin/rent-acar-add-rent-acar-admin-modal/rent-acar-add-rent-acar-admin-modal.component';


@Component({
  selector: 'app-rent-acar-enterprise-profile',
  templateUrl: './rent-acar-enterprise-profile.component.html',
  styleUrls: ['./rent-acar-enterprise-profile.component.css']
})
export class RentACarEnterpriseProfileComponent implements OnInit {
  Enterprise;
  Enterprise2;
  id: number;
  name: string;
  description: string;
  address: string;
  EnterpriseRatingArr=[];
  animeArr=[];
  counter;
  rating: number;
  isHalf = false;
 
  role: string;
  constructor(private modalService : NgbModal,private toaster: ToastrService, private enterpriseService: EnterpriseService, private route: ActivatedRoute) { 
    this.role = localStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];

    });
    this.enterpriseService.getOneEnterprise(this.id).subscribe(i =>{
      this.Enterprise = i;
     
    this.rating = 0;
    for(let j = 0; j < this.Enterprise.rating.length; j++){
      this.rating = this.rating + this.Enterprise.rating[j].rating;
    }
    this.name = this.Enterprise.name;
    this.description = this.Enterprise.description;
    this.address = this.Enterprise.address.street + " " + this.Enterprise.address.streetNo + " " + this.Enterprise.address.zipCode + " " + this.Enterprise.address.city + ", " + this.Enterprise.address.country;
    this.rating = Math.ceil(this.rating / this.Enterprise.rating.length);
   
      this.updateStars();
      this.getArrayValues(0);
      
      this.toaster.success("Your request has been successfully executed",'Enterprise profile',{
        timeOut : 3000
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

  openAddAdminModal(){
    const modalRef = this.modalService.open(RentACarAddRentACarAdminModalComponent);
    modalRef.componentInstance.item = this.id;
  }

 
}
