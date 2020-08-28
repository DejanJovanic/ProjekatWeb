import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';

@Component({
  selector: 'app-rent-acar-add-branch-modal',
  templateUrl: './rent-acar-add-branch-modal.component.html',
  styleUrls: ['./rent-acar-add-branch-modal.component.css']
})
export class RentACarAddBranchModalComponent implements OnInit {
  alert: boolean = false;
  addBranchForm: FormGroup;
  @Input()
  item : RentACarEnterprise
  constructor(public activeModal : NgbActiveModal, private service: ValidationService) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.addBranchForm = new FormGroup({
      branchName: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      branchCountry: new FormControl('', [Validators.required, this.service.lettersValidator]),
      branchCity: new FormControl('', [Validators.required, this.service.lettersValidator] ),
      branchStreet: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      branchStreetNo: new FormControl('', [Validators.required, this.service.lettersAndNumbers]),
      branchZipCode: new FormControl('', [Validators.required, this.service.numbersValidator])
    });
  }

  addBranch(){
    
    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }
 

 


}
