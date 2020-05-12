import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendAddModalComponent } from '../friend-add-modal/friend-add-modal.component';

@Component({
  selector: 'app-friends-main',
  templateUrl: './friends-main.component.html',
  styleUrls: ['./friends-main.component.css']
})
export class FriendsMainComponent implements OnInit {

  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
    
  }

  AddFriends(){
    const modalRef = this.modalService.open(FriendAddModalComponent,{size : 'lg'});
  }

}
