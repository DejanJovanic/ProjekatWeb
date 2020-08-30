import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserNetworkService } from '../../Services/UserNetwork/user-network.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-friends-panel',
  templateUrl: './friends-panel.component.html',
  styleUrls: ['./friends-panel.component.css']
})
export class FriendsPanelComponent implements OnInit {
  @Input()
  user : User
  constructor(private network : UserNetworkService,private toast : ToastrService) { }

  ngOnInit(): void {
  }

  Delete(){
    this.network.DeletFriend(this.user.username).subscribe(i => {
      if(i){
        this.network.GetPendingFriendRequest().subscribe(_ =>{})
        this.network.getFriends().subscribe(_ => {})
        this.toast.success("User successfully remove from friends");
      } 
    })
  }

}
