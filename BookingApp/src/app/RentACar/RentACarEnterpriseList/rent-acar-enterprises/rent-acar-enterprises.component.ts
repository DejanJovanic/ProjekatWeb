import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from "../../../Shared/Model/RentACars/RentACarEnterprise.model";
import { RentACarEnterpriseServiceService } from "../../../Shared/Services/rent-acar-enterprise-service.service"
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-rent-acar-enterprises',
  templateUrl: './rent-acar-enterprises.component.html',
  styleUrls: ['./rent-acar-enterprises.component.css']
})
export class RentACarEnterprisesComponent implements OnInit {
  searchEnterpriseForm: FormGroup;

 
 
  RentACarEnterprises: RentACarEnterprise[] = [];
  RentACarSearchedEnterprises: RentACarEnterprise[] =[];
  minDate = undefined;
  slides: any = [[]];
  formatedDates: string[] = []; //ovo koristim sada samo zbog lakse provere kod rezervacije, kasnije ce biti niz tipa Date
 
  datesBetween: Date[] = [];
  numberOfDays: number;

  constructor(private EnterpriseService: RentACarEnterpriseServiceService, public datepipe: DatePipe) { 
    const current = new Date();
    this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
  };
   
  this.RentACarEnterprises = EnterpriseService.getRentACarEnterprises();
  }
 
  ngOnInit() {
    
      this.setForm();
      this.slides = this.chunk(this.RentACarEnterprises, 3);
      
  }

   
  setForm(){

    this.searchEnterpriseForm = new FormGroup({
      enterpriseName: new FormControl('', Validators.required),
      branchLocation: new FormControl('', Validators.required),
      modelFrom: new FormControl('', Validators.required),
      modelTo: new FormControl('', Validators.required)
      
    });
  }
  
  searchCompanies(){

    var enterpriseN = this.searchEnterpriseForm.value.enterpriseName;
    var branchL = this.searchEnterpriseForm.value.branchLocation;
    
    var dateFrom = new Date(this.searchEnterpriseForm.value.modelFrom.year,this.searchEnterpriseForm.value.modelFrom.month -1,
      this.searchEnterpriseForm.value.modelFrom.day);
    
    var dateTo = new Date(this.searchEnterpriseForm.value.modelTo.year,this.searchEnterpriseForm.value.modelTo.month -1,
      this.searchEnterpriseForm.value.modelTo.day);
  
    var MS_PER_DAY = 1000 * 60 * 60 * 24;
    var start  = dateFrom.getTime();
    var end = dateTo.getTime();
    var  numberOfDays = Math.ceil((end - start) / MS_PER_DAY);


    this.datesBetween = Array.from(new Array(numberOfDays + 1), 
    (v, i) => new Date(start + (i * MS_PER_DAY)));
    

    //ovaj for ispod, sa formatiranim datumima, koristim samo zbog lakseg testiranja
    for(let i: number = 0; i < this.datesBetween.length; i++){
        this.formatedDates.push(this.datepipe.transform(this.datesBetween[i], 'dd-MM-yyyy'));
    }
    
    
    for(let i: number = 0; (i < this.RentACarEnterprises.length); i++){
    
      if(this.RentACarEnterprises[i].EnterpriseName == enterpriseN || enterpriseN == "" || this.RentACarEnterprises[i].EnterpriseName.toLowerCase() == enterpriseN.toLowerCase())
      {
        
        if(branchL == ""){
          
          this.RentACarSearchedEnterprises.push(this.RentACarEnterprises[i]);
        }
        else{
          var found = 0;
          for(let j: number = 0; (j < this.RentACarEnterprises[i].EnterpriseBranchs.length); j++){
            if(this.RentACarEnterprises[i].EnterpriseBranchs[j].BranchAddress.City.toLowerCase() == branchL.toLowerCase() || this.RentACarEnterprises[i].EnterpriseAddress.City.toLowerCase() == branchL.toLowerCase()){
              found++;
              break; 
            }
          }
          if(found != 0){
              for(let j: number = 0; j < this.RentACarEnterprises[i].EnterpriseCars.length; j++){
                for(let l: number = 0; l < this.RentACarEnterprises[i].EnterpriseCars[j].CarRentedDates.length; l++){
                  for(let k: number = 0; k < this.formatedDates.length; k++){
                    if(this.RentACarEnterprises[i].EnterpriseCars[j].CarRentedDates[l] == this.formatedDates[k]){
                      var rented = true;
                    }
                  }
                }
                if(rented){
                  rented = false;
                  continue;
                }
                else{
                  this.RentACarSearchedEnterprises.push(this.RentACarEnterprises[i]);
                  break;
                }
              }

            
          }
        }
      }
     
    }
    
    this.slides = this.chunk(this.RentACarSearchedEnterprises, 3);
    this.RentACarSearchedEnterprises = [];
    this.datesBetween = [];
    this.formatedDates = [];
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

}
