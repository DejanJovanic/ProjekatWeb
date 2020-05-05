import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';

@Component({
  selector: 'app-friends-pending-request',
  templateUrl: './friends-pending-request.component.html',
  styleUrls: ['./friends-pending-request.component.css']
})
export class FriendsPendingRequestComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
