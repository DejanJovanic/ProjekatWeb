import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FriendAddModalComponent } from '../friend-add-modal/friend-add-modal.component';
import { UserNetworkService } from '../../Services/UserNetwork/user-network.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-friends-main',
  templateUrl: './friends-main.component.html',
  styleUrls: ['./friends-main.component.css']
})
export class FriendsMainComponent implements OnInit,OnDestroy {

  private sub : Subscription
  constructor(private modalService : NgbModal,private network : UserNetworkService) { }
  ngOnDestroy(): void {
    if(this.sub) this.sub.unsubscribe()
  }

  ngOnInit(): void {
    this.sub = this.network.GetPendingFriendRequest().subscribe(i =>{})
  }

  AddFriends(){
    const modalRef = this.modalService.open(FriendAddModalComponent,{size : 'lg'});
  }

}
