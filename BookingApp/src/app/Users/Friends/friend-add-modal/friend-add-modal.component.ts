import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserNetworkService } from '../../Services/UserNetwork/user-network.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCacheService } from '../../Services/UserCache/user-cache.service';

@Component({
  selector: 'app-friend-add-modal',
  templateUrl: './friend-add-modal.component.html',
  styleUrls: ['./friend-add-modal.component.css']
})
export class FriendAddModalComponent implements OnInit {

  public searchItems : Observable<{username : string, name: string, lastName : string}[]>
  constructor(private service : UserNetworkService,private modal : NgbActiveModal,private cache : UserCacheService) { }

  ngOnInit(): void {
  }
  public IsInFriends(username : string){
    return this.cache.friends.value.some(i => i.username.toLowerCase() == username.toLowerCase())
  }
  onSearch($event : {username : string, name: string, lastName : string}){
    this.searchItems = this.service.SearchForFriends($event);
  }
  SendRequest(username : string){
    this.service.SendFriendRequest(username).subscribe(i =>{
      if(i) this.modal.close();
    });
  }

}
