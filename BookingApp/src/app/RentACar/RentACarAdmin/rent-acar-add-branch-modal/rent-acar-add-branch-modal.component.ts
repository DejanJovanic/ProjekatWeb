import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      branchCountry: new FormControl('', Validators.required),
      branchCity: new FormControl('', Validators.required),
      branchStreet: new FormControl('', Validators.required),
      branchStreetNo: new FormControl('', Validators.required),
      branchZipCode: new FormControl('', Validators.required)
    });
  }

  addBranch(){
    

    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

}
