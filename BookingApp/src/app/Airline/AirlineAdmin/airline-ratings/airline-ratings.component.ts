import { Component, OnInit } from '@angular/core';
import { AirlineDataService } from '../Services/AirlineData/airline-data.service';

@Component({
  selector: 'app-airline-ratings',
  templateUrl: './airline-ratings.component.html',
  styleUrls: ['./airline-ratings.component.css']
})
export class AirlineRatingsComponent implements OnInit {

  public rating : number = 0;
  public flights : {id : number, class:string, startLocation : string,endLocation : string, isRoundTrip : boolean, rating : number}[] = []
  constructor(private service : AirlineDataService) { }

  ngOnInit(): void {
    this.rating = this.service.GetCompanyRating(this.service.data.getValue());
    let temp = this.service.GetRatingByFlight(this.service.data.getValue().flights);
    for(let a of this.service.data.getValue().flights){
      let item = temp.find(i => i.id == a.id);
      if(item){
        this.flights.push({id : a.id, class : "aaa", startLocation : a.startLocation,endLocation : a.endLocation, isRoundTrip : a.isRoundTrip, rating : item.rating})
      }
    }
  }

}
