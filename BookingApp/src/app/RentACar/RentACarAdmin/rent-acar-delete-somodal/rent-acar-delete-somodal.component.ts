import { Component, OnInit, Input } from '@angular/core';
import { SpecialOffer } from 'src/app/Shared/Model/RentACars/Models/SpecialOffer.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SpecialOfferService } from '../../Services/SpecialOfferService/special-offer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-acar-delete-somodal',
  templateUrl: './rent-acar-delete-somodal.component.html',
  styleUrls: ['./rent-acar-delete-somodal.component.css']
})
export class RentACarDeleteSOModalComponent implements OnInit {

  return;
  @Input()
  item : SpecialOffer;
  constructor(private routeService: Router, private specialOfferService: SpecialOfferService, private toaster: ToastrService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
  }
  deleteSpecialOffer(){
    this.specialOfferService.deleteSpecialOffer(this.item.enterpriseId, this.item.id).subscribe(i =>{

      this.return = i;
      this.toaster.success("Delete operation has been successfully executed. You will be redirected to enterprise profile in 3 seconds.",'Delete a special offer',{
        timeOut : 2000
      })
    })
    setTimeout(() => {
      this.routeService.navigate(['/EnterpriseProfile/', this.item.enterpriseId]);
  }, 3000); 
    this.activeModal.close();
  }
}
