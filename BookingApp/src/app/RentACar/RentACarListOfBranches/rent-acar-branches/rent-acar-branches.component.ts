import { Component, OnInit } from '@angular/core';
import { RentACarEnterprise } from 'src/app/Shared/Model/RentACars/RentACarEnterprise.model';
import { ActivatedRoute, Params } from '@angular/router';
import { RentACarEnterpriseServiceService } from 'src/app/Shared/Services/rent-acar-enterprise-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentACarAddBranchModalComponent } from '../../RentACarAdmin/rent-acar-add-branch-modal/rent-acar-add-branch-modal.component';
import { RentACarBranchDetailsModalComponent } from '../../rent-acar-branch-details-modal/rent-acar-branch-details-modal.component';
import { ToastrService } from 'ngx-toastr';
import { BranchService } from '../../Services/BranchService/branch.service';

@Component({
  selector: 'app-rent-acar-branches',
  templateUrl: './rent-acar-branches.component.html',
  styleUrls: ['./rent-acar-branches.component.css']
})
export class RentACarBranchesComponent implements OnInit {
  
  Branches;
  OneBranch;
  id: number;
  slides: any = [[]];
  role: string;
  constructor(private toaster: ToastrService, private branchService: BranchService, private modalService : NgbModal,  private route: ActivatedRoute) { 
    this.role = localStorage["Role"]
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
   
    });
    this.branchService.getAllBranches(this.id).subscribe(i => {
      this.Branches = i;
      this.slides = this.chunk(this.Branches, 3);
      this.toaster.success("Your request has been successfully executed",'Branches',{
        timeOut : 3000
      })
    })
   
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  openBranchAddModal(){
    const modalRef = this.modalService.open(RentACarAddBranchModalComponent);
    modalRef.componentInstance.item = this.id;
  }

  openBranchDetailsModal(branchId: number){
    this.branchService.getOneBranch(this.id, branchId).subscribe(i =>{
      const modalRef = this.modalService.open(RentACarBranchDetailsModalComponent);
      this.OneBranch = i;
      this.toaster.success("Your request has been successfully executed",'Branch details',{
        timeOut : 3000
      })
      this.OneBranch.enterpriseId = this.id;
      
      modalRef.componentInstance.item = this.OneBranch;
    })
   
    
  }

}
