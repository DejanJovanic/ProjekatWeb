import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { BranchService } from '../../Services/BranchService/branch.service';
import { ToastrService } from 'ngx-toastr';
import { AddBranchParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/AddBranchParameters.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-add-branch-modal',
  templateUrl: './rent-acar-add-branch-modal.component.html',
  styleUrls: ['./rent-acar-add-branch-modal.component.css']
})
export class RentACarAddBranchModalComponent implements OnInit {

  addBranchForm: FormGroup;
  return;
  @Input()
  item : number
  constructor(private routeService: Router, private branchService: BranchService, private toaster: ToastrService, public activeModal : NgbActiveModal, private service: ValidationService) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.addBranchForm = new FormGroup({
      branchName: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      branchCountry: new FormControl('', [Validators.required, this.service.lettersValidator]),
      branchCity: new FormControl('', [Validators.required, this.service.lettersValidator] ),
      branchStreet: new FormControl('', Validators.required),
      branchStreetNo: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      branchZipCode: new FormControl('', [Validators.required, this.service.numbersValidator])
    });
  }

  addBranch(){
    var parameters = new AddBranchParameters();
    parameters.enterpriseId = this.item;
    parameters.city = this.addBranchForm.value.branchCity;
    parameters.name = this.addBranchForm.value.branchName;
    parameters.country = this.addBranchForm.value.branchCountry;
    parameters.street =  this.addBranchForm.value.branchStreet;
    parameters.streetNo = this.addBranchForm.value.branchStreetNo;
    parameters.zipCode =  this.addBranchForm.value.branchZipCode;
   

    this.branchService.addBranch(parameters).subscribe(i =>{
      this.return = i;
      this.toaster.success("Add operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Add a branch',{
        timeOut : 2000
      })

      setTimeout(() => {
        this.routeService.navigate(['/EnterpriseProfile/', this.item]);
    }, 3000);  
      this.activeModal.close();
    })
    
  }

 
 

 


}
