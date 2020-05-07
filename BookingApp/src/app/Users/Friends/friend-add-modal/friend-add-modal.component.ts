import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UserNetworkService } from '../../Services/UserNetwork/user-network.service';

@Component({
  selector: 'app-friend-add-modal',
  templateUrl: './friend-add-modal.component.html',
  styleUrls: ['./friend-add-modal.component.css']
})
export class FriendAddModalComponent implements OnInit {

  public searchItems : Observable<{username : string, name: string, lastName : string}[]>
  constructor(private service : UserNetworkService) { }

  ngOnInit(): void {
  }

  onSearch($event : {username : string, name: string, lastName : string}){
    this.searchItems = this.service.SearchForFriends($event);
  }
  SendRequest(username : string){
    this.service.SendFriendRequest(username);
  }

}
