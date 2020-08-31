import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from "../../../Shared/Model/RentACars/RentACarEnterprise.model";
import { RentACarEnterpriseServiceService } from "../../../Shared/Services/rent-acar-enterprise-service.service"
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { Enterprise } from 'src/app/Shared/Model/RentACars/Models/Enterprise.model';
import { EnterpriseService } from '../../Services/EnterpriseService/enterprise.service';
import { ToastrService } from 'ngx-toastr';
import { SearchEnterprisesParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchEnterprisesParameters.model';
import { SearchCarsForRentParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/SearchCarsForRentParameters.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddEnterpriseModalComponent } from '../../RentACarAdmin/rent-acar-add-enterprise-modal/rent-acar-add-enterprise-modal.component';



@Component({
  selector: 'app-rent-acar-enterprises',
  templateUrl: './rent-acar-enterprises.component.html',
  styleUrls: ['./rent-acar-enterprises.component.css']
})
export class RentACarEnterprisesComponent implements OnInit {
  searchEnterpriseForm: FormGroup;

  Enterprises;
 
  RentACarEnterprises: RentACarEnterprise[] = [];
  RentACarSearchedEnterprises: RentACarEnterprise[] =[];
  minDate = undefined;
  slides: any = [[]];
  formatedDates: string[] = []; //ovo koristim sada samo zbog lakse provere kod rezervacije, kasnije ce biti niz tipa Date
 
  datesBetween: Date[] = [];
  numberOfDays: number;
  role: string;
  constructor(private modalService : NgbModal,private toaster: ToastrService, private enterpriseService: EnterpriseService, private service: ValidationService, public datepipe: DatePipe) { 
    const current = new Date();
    this.minDate = {
    year: current.getFullYear(),
    month: current.getMonth() + 1,
    day: current.getDate()
  };
  this.role = localStorage["Role"]
 
  }
 
  ngOnInit() {
    this.enterpriseService.getAllEnterprises().subscribe(i =>{
      this.Enterprises = i;
      this.slides = this.chunk(this.Enterprises, 3);
      this.toaster.success("Your request has been successfully executed",'Enterprises',{
        timeOut : 3000
      })
    
    })
     
      this.setForm();
     
      
  }

  
  setForm(){
    this.searchEnterpriseForm = new FormGroup({
      enterpriseName: new FormControl('', this.service.lettersAndNumbers),
      branchLocation: new FormControl('', this.service.letters2Validator),
      modelFrom: new FormControl('', [Validators.required, this.service.firstDateValidator]),
      modelTo: new FormControl('', [Validators.required, this.service.secondDateValidator])
      
    });
  
  }
  
  searchCompanies(){

    var parameters = new SearchEnterprisesParameters();
    parameters.branchLocation = this.searchEnterpriseForm.value.branchLocation;
    parameters.enterpriseName = this.searchEnterpriseForm.value.enterpriseName;
    parameters.rentFrom = new Date(this.searchEnterpriseForm.value.modelFrom.year,this.searchEnterpriseForm.value.modelFrom.month -1,
    this.searchEnterpriseForm.value.modelFrom.day);
    parameters.rentTo = new Date(this.searchEnterpriseForm.value.modelTo.year,this.searchEnterpriseForm.value.modelTo.month -1,
      this.searchEnterpriseForm.value.modelTo.day);


    this.enterpriseService.searchEnterprises(parameters).subscribe(i =>{
      this.Enterprises = i;
      this.slides = this.chunk(this.Enterprises, 3);
      this.toaster.success("Your search request has been successfully executed",'Searched enterprises',{
        timeOut : 3000
      })
    
    })
   
    
  
  }
    
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  showAllCompanies(){
    
          this.enterpriseService.getAllEnterprises().subscribe(i =>{
          this.Enterprises = i;
          this.slides = this.chunk(this.Enterprises, 3);
          this.toaster.success("Your request has been successfully executed",'List of all enterprises',{
            timeOut : 3000
          })
        }
        
      )
  }

  openEnterpriseAddModal(){
    const modalRef = this.modalService.open(RentACarAddEnterpriseModalComponent);
   
  }


  

}
