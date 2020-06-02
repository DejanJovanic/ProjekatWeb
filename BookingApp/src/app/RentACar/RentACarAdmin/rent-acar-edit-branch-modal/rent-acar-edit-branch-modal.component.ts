import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      branchCountry: new FormControl(this.item.BranchAddress.Country, Validators.required),
      branchCity: new FormControl(this.item.BranchAddress.City, Validators.required),
      branchStreet: new FormControl(this.item.BranchAddress.Street, Validators.required),
      branchStreetNo: new FormControl(this.item.BranchAddress.StreetNo, Validators.required),
      branchZipCode: new FormControl(this.item.BranchAddress.ZipCode, Validators.required)
    });
  }

  editBranch(){
    this.alert = true;
  }

  closeAlert(){
    this.alert= false;
  }

}
