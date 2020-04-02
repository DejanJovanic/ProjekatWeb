import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlineDetailsComponent} from './Airline/airline-details/airline-details.component';
import { AirlinePanelComponent} from './Airline/airline-panel/airline-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    AirlineDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
