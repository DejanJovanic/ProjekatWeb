import { Component, OnInit, Input } from '@angular/core';
import { Branch } from 'src/app/Shared/Model/RentACars/Branch.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EnterpriseBranch } from 'src/app/Shared/Model/RentACars/Models/EnterpriseBranch.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BranchService } from '../../Services/BranchService/branch.service';
import { timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-delete-branch-modal',
  templateUrl: './rent-acar-delete-branch-modal.component.html',
  styleUrls: ['./rent-acar-delete-branch-modal.component.css']
})
export class RentACarDeleteBranchModalComponent implements OnInit {

  return;
  @Input()
  item : EnterpriseBranch;
  constructor(private routeService: Router, private branchService: BranchService, private toaster: ToastrService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }

  deleteBranch(){
    
    this.branchService.deleteBranch(this.item.enterpriseId, this.item.id).subscribe(i => {
      this.return = i;
      this.toaster.success("Delete operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Delete a branch',{
        timeOut : 2000
      })
    })
    setTimeout(() => {
      this.routeService.navigate(['/EnterpriseProfile/', this.item.enterpriseId]);
  }, 3000);  
    this.activeModal.close();
  }

}
