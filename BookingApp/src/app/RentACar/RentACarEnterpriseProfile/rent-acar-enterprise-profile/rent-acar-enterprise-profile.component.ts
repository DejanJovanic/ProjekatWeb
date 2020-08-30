import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rent-acar-enterprise-profile',
  templateUrl: './rent-acar-enterprise-profile.component.html',
  styleUrls: ['./rent-acar-enterprise-profile.component.css']
})
export class RentACarEnterpriseProfileComponent implements OnInit {
  Enterprise;
  id: number;
  EnterpriseRatingArr=[];
  animeArr=[];
  counter;
  rating: number;
  isHalf = false;
 
  role: string;
  constructor(private toaster: ToastrService, private enterpriseService: EnterpriseService, private route: ActivatedRoute) { 
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

 
}
