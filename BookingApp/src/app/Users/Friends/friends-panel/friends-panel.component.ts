import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';

@Component({
  selector: 'app-friends-panel',
  templateUrl: './friends-panel.component.html',
  styleUrls: ['./friends-panel.component.css']
})
export class FriendsPanelComponent implements OnInit {
  @Input()
  user : User
  constructor() { }

  ngOnInit(): void {
  }

}
