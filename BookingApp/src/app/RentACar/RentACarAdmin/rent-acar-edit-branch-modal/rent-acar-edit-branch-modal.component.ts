import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';
import { BranchService } from '../../Services/BranchService/branch.service';
import { EditBranchParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/EditBranchParameters.model';
import { EnterpriseBranch } from 'src/app/Shared/Model/RentACars/Models/EnterpriseBranch.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-edit-branch-modal',
  templateUrl: './rent-acar-edit-branch-modal.component.html',
  styleUrls: ['./rent-acar-edit-branch-modal.component.css']
})
export class RentACarEditBranchModalComponent implements OnInit {
 
  editBranchForm: FormGroup;
  return;
  @Input()
  item : EnterpriseBranch
  constructor(private routeService: Router, private toaster: ToastrService, private branchService: BranchService, private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.editBranchForm = new FormGroup({
      branchName: new FormControl(this.item.name, Validators.required),
      branchCountry: new FormControl(this.item.country, [Validators.required, this.service.lettersValidator]),
      branchCity: new FormControl(this.item.city, [Validators.required, this.service.lettersValidator] ),
      branchStreet: new FormControl(this.item.street, Validators.required),
      branchStreetNo: new FormControl(this.item.streetNo, [Validators.required, this.service.lettersAndNumbers]),
      branchZipCode: new FormControl(this.item.zipCode, [Validators.required, this.service.numbersValidator])
    });
  }

  editBranch(){
    var parameters = new EditBranchParameters();
    parameters.enterpriseId = this.item.enterpriseId;
    parameters.branchId = this.item.id;
    parameters.city = this.editBranchForm.value.branchCity;
    parameters.name = this.editBranchForm.value.branchName;
    parameters.country = this.editBranchForm.value.branchCountry;
    parameters.street =  this.editBranchForm.value.branchStreet;
    parameters.streetNo = this.editBranchForm.value.branchStreetNo;
    parameters.zipCode =  this.editBranchForm.value.branchZipCode;
   

    this.branchService.editBranch(parameters).subscribe(i =>{
      this.return = i;
      this.toaster.success("Edit operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Edit a branch',{
        timeOut : 2000
      })

      setTimeout(() => {
        this.routeService.navigate(['RentACarEnterpriseAdmin']);
    }, 3000); 
      this.activeModal.close();
    })
  }

 

}
