import { Injectable } from '@angular/core';
import { Background } from '../../Model/Common/Background.model';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  public BackgroundName : string
  public CurrentBackground : Background
  constructor() { 
    this.CurrentBackground = Background.None
    this.BackgroundName = 'none.jpg'
  }

  public SetBackgroud( background : Background){
    if(this.CurrentBackground != background){
      switch(background){
        case Background.None:
          this.BackgroundName = 'none.jpg'
          break;
        case Background.FlightEdit:
          this.BackgroundName = 'FlightEdit.jpg'
          break;
        case Background.AirlineAdminMain:
          this.BackgroundName = 'AirlineAdminMain.jfif'
          break;
      }
    }   
  }
}
