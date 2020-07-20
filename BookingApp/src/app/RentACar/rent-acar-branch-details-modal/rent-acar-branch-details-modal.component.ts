import { Component, OnInit, Input } from '@angular/core';
import { Branch } from 'src/app/Shared/Model/RentACars/Branch.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { RentACarEditBranchModalComponent } from '../RentACarAdmin/rent-acar-edit-branch-modal/rent-acar-edit-branch-modal.component';

@Component({
  selector: 'app-rent-acar-branch-details-modal',
  templateUrl: './rent-acar-branch-details-modal.component.html',
  styleUrls: ['./rent-acar-branch-details-modal.component.css']
})
export class RentACarBranchDetailsModalComponent implements OnInit {

  role: string;

  @Input()
   item: Branch;
  constructor(public activeModal : NgbActiveModal, private modalService : NgbModal, private EnterpriseService: RentACarEnterpriseServiceService) { 
    this.role = sessionStorage["Role"]
  }

  ngOnInit(): void {
  }

  openEditBranchModal(branchId: number){
    const modalRef = this.modalService.open(RentACarEditBranchModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneBranch(branchId);
  }

}