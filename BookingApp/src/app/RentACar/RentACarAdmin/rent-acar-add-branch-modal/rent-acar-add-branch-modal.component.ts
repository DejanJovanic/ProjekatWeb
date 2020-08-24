import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.setForm();
  }
  setForm(){
   
    this.addBranchForm = new FormGroup({
      branchName: new FormControl('', Validators.required),
      branchCountry: new FormControl('', [Validators.required, this.lettersValidator]),
      branchCity: new FormControl('', [Validators.required, this.lettersValidator] ),
      branchStreet: new FormControl('', [Validators.required, this.lettersAndNumbers]),
      branchStreetNo: new FormControl('', [Validators.required, this.lettersAndNumbers]),
      branchZipCode: new FormControl('', [Validators.required, this.numbersValidator])
    });
  }

  addBranch(){
    

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
