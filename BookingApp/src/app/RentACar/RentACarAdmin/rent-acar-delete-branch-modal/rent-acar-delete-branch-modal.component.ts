import { Component, OnInit, Input } from '@angular/core';
import { Branch } from 'src/app/Shared/Model/RentACars/Branch.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rent-acar-delete-branch-modal',
  templateUrl: './rent-acar-delete-branch-modal.component.html',
  styleUrls: ['./rent-acar-delete-branch-modal.component.css']
})
export class RentACarDeleteBranchModalComponent implements OnInit {

  @Input()
  item : Branch;
  constructor(public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteBranch(branchId: number){
    
  }

}
