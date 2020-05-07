import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

  searchForm : FormGroup;
  @Output()
  searchEvent : EventEmitter<{username : string, name : string, lastName : string}> = new EventEmitter()
  constructor(private builder : FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.builder.group({
      username : '',
      name : '',
      lastName : ''
    })
  }

  public onSubmit(){
    this.searchEvent.emit({
      username : this.searchForm.value.username,
      name : this.searchForm.value.name,
      lastName : this.searchForm.value.lastName,
    })
  }

}
