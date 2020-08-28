import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Branch } from 'src/app/Shared/Model/RentACars/Branch.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../Services/ValidationService/validation.service';

@Component({
  selector: 'app-rent-acar-edit-branch-modal',
  templateUrl: './rent-acar-edit-branch-modal.component.html',
  styleUrls: ['./rent-acar-edit-branch-modal.component.css']
})
export class RentACarEditBranchModalComponent implements OnInit {
  alert: boolean = false;
  editBranchForm: FormGroup;
  @Input()
  item : Branch
  constructor(private service: ValidationService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.editBranchForm = new FormGroup({
      branchName: new FormControl(this.item.BranchName, Validators.required),
      branchCountry: new FormControl(this.item.BranchAddress.Country, [Validators.required, this.service.lettersValidator]),
      branchCity: new FormControl(this.item.BranchAddress.City, [Validators.required, this.service.lettersValidator] ),
      branchStreet: new FormControl(this.item.BranchAddress.Street, [Validators.required, this.service.lettersAndNumbers]),
      branchStreetNo: new FormControl(this.item.BranchAddress.StreetNo, [Validators.required, this.service.lettersAndNumbers]),
      branchZipCode: new FormControl(this.item.BranchAddress.ZipCode, [Validators.required, this.service.numbersValidator])
    });
  }

  editBranch(){
    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

}
