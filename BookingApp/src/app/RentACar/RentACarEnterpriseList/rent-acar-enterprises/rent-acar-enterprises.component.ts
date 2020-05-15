import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from "../../../Shared/Model/RentACars/RentACarEnterprise.model";
import { RentACarEnterpriseServiceService } from "../../../Shared/Services/rent-acar-enterprise-service.service"
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-rent-acar-enterprises',
  templateUrl: './rent-acar-enterprises.component.html',
  styleUrls: ['./rent-acar-enterprises.component.css']
})
export class RentACarEnterprisesComponent implements OnInit {
  searchEnterpriseForm = new FormGroup({
    enterpriseName: new FormControl(''),
    branchLocation: new FormControl(''),
    modelFrom: new FormControl(''),
    modelTo: new FormControl('')
    
  });
 
  RentACarEnterprises: RentACarEnterprise[] = [];
  RentACarSearchedEnterprises: RentACarEnterprise[] =[];
  minDate = undefined;
  slides: any = [[]];

  constructor(private RentACarEnterprise: RentACarEnterpriseServiceService) { 
    const current = new Date();
    this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
  };
    this.RentACarEnterprises = RentACarEnterprise.getRentACarEnterprises();

  }
  
  searchCompanies(){

    var dateFrom = this.searchEnterpriseForm.value.modelFrom;
    var dateTo = this.searchEnterpriseForm.value.modelTo;
    var enterpriseN = this.searchEnterpriseForm.value.enterpriseName;
    var branchL = this.searchEnterpriseForm.value.branchLocation;
    
    //console.log(dateFrom);
    //console.log(dateTo);
    for(let i: number = 0; (i < this.RentACarEnterprises.length); i++){
      //console.log(company);
      if(this.RentACarEnterprises[i].EnterpriseName == enterpriseN || enterpriseN == "" || this.RentACarEnterprises[i].EnterpriseName.toLowerCase().includes(enterpriseN) || this.RentACarEnterprises[i].EnterpriseName.includes(enterpriseN))
      {
        
        if(branchL == ""){
          //console.log("aa");
          this.RentACarSearchedEnterprises.push(this.RentACarEnterprises[i]);
        }
        else{
          var found = 0;
          for(let j: number = 0; (j < this.RentACarEnterprises[i].EnterpriseBranchs.length); j++){
            if(this.RentACarEnterprises[i].EnterpriseBranchs[j].BranchAddress.City == branchL){
              found++;
              break; 
            }
          }
          if(found != 0){
            this.RentACarSearchedEnterprises.push(this.RentACarEnterprises[i]);
          }
        }
      }
     
    }
    
    this.slides = this.chunk(this.RentACarSearchedEnterprises, 3);
    this.RentACarSearchedEnterprises = [];
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  showAllCompanies(){
    
    this.slides = this.chunk(this.RentACarEnterprises, 3);
  }
  
 
  ngOnInit() {
   
      this.slides = this.chunk(this.RentACarEnterprises, 3);
      
  }

}
