import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlineDetailsComponent} from './Airline/airline-details/airline-details.component';
import { AirlinePanelComponent} from './Airline/airline-panel/airline-panel.component';
import { MainComponentComponent } from './Shared/MainComponent/main-component/main-component.component';
import { AirlineMainComponentComponent } from './Airline/airline-main-component/airline-main-component.component';
import { AirlineHolderComponentComponent } from './Airline/airline-holder-component/airline-holder-component.component';
import { AirlineFilterComponentComponent } from './Airline/airline-filter-component/airline-filter-component.component';
import { AirlineSearchComponentComponent } from './Airline/airline-search-component/airline-search-component.component';

@NgModule({
  declarations: [
    AppComponent,
    AirlineDetailsComponent,
    MainComponentComponent,
    AirlineMainComponentComponent,
    AirlineHolderComponentComponent,
    AirlineFilterComponentComponent,
    AirlineSearchComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
