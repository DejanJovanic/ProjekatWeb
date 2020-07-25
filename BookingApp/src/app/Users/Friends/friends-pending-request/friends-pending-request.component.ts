import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from '../../Services/UserCache/user-cache.service';
import { UserNetworkService } from '../../Services/UserNetwork/user-network.service';

@Component({
  selector: 'app-friends-pending-request',
  templateUrl: './friends-pending-request.component.html',
  styleUrls: ['./friends-pending-request.component.css']
})
export class FriendsPendingRequestComponent implements OnInit {

  pendingRequests : Observable<User[]>
  private sub : Subscription
  constructor(private cache : UserCacheService,private network : UserNetworkService) {
    this.pendingRequests = this.cache.pendingRequests.asObservable();

   }

  ngOnInit(): void {
  }


  public Accept(request : User){
    this.sub = this.network.AcceptFriendRequest(request.username).subscribe(i => {
      if(i){
        this.network.GetPendingFriendRequest().subscribe(_ =>{})
        this.network.getFriends().subscribe(_ => {})
      } 
    })
  }
  public Decline(request : User){
    this.sub = this.network.DeclineFriendRequest(request.username).subscribe(i => {
      if(i){
        this.network.GetPendingFriendRequest().subscribe(_ =>{})
        this.network.getFriends().subscribe(_ => {})
      }     
    })
  }


}
