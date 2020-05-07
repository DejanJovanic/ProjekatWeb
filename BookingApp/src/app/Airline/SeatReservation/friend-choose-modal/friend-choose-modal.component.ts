import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserCacheService } from 'src/app/Users/Services/UserCache/user-cache.service';
import { Observable, Subject, combineLatest, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/Shared/Model/Common/User.model';
import { UserFlightDetailsModal } from 'src/app/Shared/Model/Airlines/UserFlightDetailsModal.model';

@Component({
  selector: 'app-friend-choose-modal',
  templateUrl: './friend-choose-modal.component.html',
  styleUrls: ['./friend-choose-modal.component.css']
})
export class FriendChooseModalComponent implements OnInit {

  friends : Observable<User[]>
  chosenFriendsEvent : BehaviorSubject<string[]>
  @Output() returnValue : EventEmitter<UserFlightDetailsModal> = new EventEmitter();


  constructor(public activeModal : NgbActiveModal,private service : UserCacheService) {
    this.chosenFriendsEvent = new BehaviorSubject(null)

   }

  ngOnInit(): void {
    if(sessionStorage["choosenFriends"] != null){
      let temp = JSON.parse(sessionStorage["choosenFriends"]);
      this.chosenFriendsEvent.next(temp);
    }
    else{
      this.chosenFriendsEvent.next([]);
    }
    this.friends = combineLatest(this.service.friends,this.chosenFriendsEvent,(friends : User[],chosen : string[]) =>{
      if(chosen != null && chosen != []){
        let ret = []
        for(let a of friends){
          if(chosen.find(i => i == a.username) == null){
            ret.push(a);
          }
        }
        return ret;
      }
      else{
        return friends;
      }
    })

  }

  onFriendClick(username : string){
    if(sessionStorage["choosenFriends"] != null){
      let temp = JSON.parse(sessionStorage["choosenFriends"]);
      temp.push(username);
      sessionStorage["choosenFriends"] = JSON.stringify(temp);
    }
    else{
      let temp = []
      temp.push(username)
      sessionStorage["choosenFriends"] = JSON.stringify(temp);
    }

    let user = this.service.friends.getValue().find(i => i.username == username);
    if(user != null){
      let data = new UserFlightDetailsModal();
      data.lastName = user.lastName;
      data.name = user.name;
      data.passportNum = user.passportNo;
      data.username = username;
      this.returnValue.next(data);
    }
    this.activeModal.close();
  }
}
