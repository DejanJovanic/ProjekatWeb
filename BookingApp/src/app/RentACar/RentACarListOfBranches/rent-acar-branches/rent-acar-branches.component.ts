import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddBranchModalComponent } from '../../RentACarAdmin/rent-acar-add-branch-modal/rent-acar-add-branch-modal.component';
import { RentACarBranchDetailsModalComponent } from '../../rent-acar-branch-details-modal/rent-acar-branch-details-modal.component';

@Component({
  selector: 'app-rent-acar-branches',
  templateUrl: './rent-acar-branches.component.html',
  styleUrls: ['./rent-acar-branches.component.css']
})
export class RentACarBranchesComponent implements OnInit {
  
  Enterprise: RentACarEnterprise;
  id: number;
  slides: any = [[]];
  role: string;
  constructor(private modalService : NgbModal, private EnterpriseService: RentACarEnterpriseServiceService, private route: ActivatedRoute) { 
    this.role = localStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
   
    
      
    });
    this.Enterprise = this.EnterpriseService.getRentACarEnterprise(this.id);
    this.slides = this.chunk(this.Enterprise.EnterpriseBranchs, 3);
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  openBranchAddModal(enterpriseId: number){
    const modalRef = this.modalService.open(RentACarAddBranchModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getRentACarEnterprise(enterpriseId);
  }

  openBranchDetailsModal(branchId: number){
    const modalRef = this.modalService.open(RentACarBranchDetailsModalComponent);
    modalRef.componentInstance.item = this.EnterpriseService.getOneBranch(branchId);
  }

}
