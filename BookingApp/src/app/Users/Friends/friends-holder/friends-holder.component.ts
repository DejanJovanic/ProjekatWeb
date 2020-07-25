import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserCacheService } from '../../Services/UserCache/user-cache.service';

@Component({
  selector: 'app-friends-holder',
  templateUrl: './friends-holder.component.html',
  styleUrls: ['./friends-holder.component.css']
})
export class FriendsHolderComponent implements OnInit {

  public friends : Observable<User[]>
  constructor(private cache : UserCacheService) { 
    this.friends = cache.friends.asObservable();
  }

  ngOnInit(): void {
  }

}
