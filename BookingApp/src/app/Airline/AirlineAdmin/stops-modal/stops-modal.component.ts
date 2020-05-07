import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stops-modal',
  templateUrl: './stops-modal.component.html',
  styleUrls: ['./stops-modal.component.css']
})
export class StopsModalComponent implements OnInit {

  @Input()
  availablePlaces : string[];

  @Input()
  selectedPlaces : string[]

  selectedItem : string;
  constructor() { }

  ngOnInit(): void {
    this.availablePlaces.unshift("Select destination")
    this.selectedItem = this.availablePlaces[0];
  }

  AddDestination(){
    if(this.selectedItem != "Select destination"){
      let temp = this.availablePlaces.find(i => i == this.selectedItem)
      if(temp != null && temp != ""){
        this.availablePlaces.splice(this.availablePlaces.indexOf(temp),1)
        this.selectedPlaces.push(temp)
        this.selectedItem = this.availablePlaces[0];
      }
    }
  }

  RemoveItem(index : number){
    let removed = this.selectedPlaces.splice(index,1);
    this.availablePlaces.push(removed[0]);
  }

}
