import { Component, OnInit, Input, HostListener } from '@angular/core';
import { AirlineCompany } from 'src/app/Shared/Model/Airlines/AirlineCompany.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AirlineDetailsComponent } from '../airline-details/airline-details.component';

@Component({
  selector: 'app-airline-panel',
  templateUrl: './airline-panel.component.html',
  styleUrls: ['./airline-panel.component.css']
})
export class AirlinePanelComponent implements OnInit {

  @Input()  
  item : AirlineCompany
  
  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }

  Open(){
   const modalRef = this.modalService.open(AirlineDetailsComponent);
   modalRef.componentInstance.item = this.item;
  }
}
