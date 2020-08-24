import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Branch } from 'src/app/Shared/Model/RentACars/Branch.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.editBranchForm = new FormGroup({
      branchName: new FormControl(this.item.BranchName, Validators.required),
      branchCountry: new FormControl(this.item.BranchAddress.Country, [Validators.required, this.lettersValidator]),
      branchCity: new FormControl(this.item.BranchAddress.City, [Validators.required, this.lettersValidator] ),
      branchStreet: new FormControl(this.item.BranchAddress.Street, [Validators.required, this.lettersAndNumbers]),
      branchStreetNo: new FormControl(this.item.BranchAddress.StreetNo, [Validators.required, this.lettersAndNumbers]),
      branchZipCode: new FormControl(this.item.BranchAddress.ZipCode, [Validators.required, this.numbersValidator])
    });
  }

  editBranch(){
    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

  lettersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[a-zA-Z]+(([a-zA-Z ])?[a-zA-Z]*)*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

  numbersValidator(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^[0-9]*$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
  }

  lettersAndNumbers(control: AbstractControl){
    if(control && control.value !== null || control.value !== undefined){
      const regex = new RegExp('^(?:[A-Za-z]*)(?:[A-Za-z0-9 _]*)$');

      if(!regex.test(control.value)){
        return{
          isError: true
        };
      }
    }
    return null;
   
  }
}
