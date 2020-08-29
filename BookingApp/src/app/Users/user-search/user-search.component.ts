import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Name } from 'src/app/Airline/AirlineShared/Validators/Name.validator';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  private oneValidator : ValidatorFn = (fg: FormGroup) => {
    const name = fg.get('name').value;
    const lastName = fg.get('lastName').value;
    const username = fg.get('username').value;
    return (name || lastName || username) ? null : {oneError : true} 

  }
  searchForm : FormGroup;
  @Output()
  searchEvent : EventEmitter<{username : string, name : string, lastName : string}> = new EventEmitter()
  constructor(private builder : FormBuilder) { }
  customErrors = {
    pattern : `'Only letters, numbers, ' , - and spaces are allowed'`
  }
  ngOnInit(): void {
    this.searchForm = this.builder.group({
      username : ['',Validators.pattern(/^[a-zA-Z-'0-9 ]+?$/)],
      name : ['',Name],
      lastName : ['',Name]
    },{validators : this.oneValidator})
  }

  public onSubmit(){
    if(this.searchForm.valid){
      this.searchEvent.emit({
        username : this.searchForm.value.username.trim(),
        name : this.searchForm.value.name.trim(),
        lastName : this.searchForm.value.lastName.trim(),
      })
    }
  
  }

}
