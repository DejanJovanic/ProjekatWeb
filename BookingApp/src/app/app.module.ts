import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlineDetailsComponent} from './Airline/airline-details/airline-details.component';
import { AirlinePanelComponent} from './Airline/airline-panel/airline-panel.component';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { AirlineMainComponent} from './Airline/airline-main/airline-main.component';
import { AirlineHolderComponent } from './Airline/airline-holder/airline-holder.component';
import { AirlineFilterComponent} from './Airline/airline-filter/airline-filter.component';
import { AirlineSearchComponent } from './Airline/airline-search/airline-search.component';
import { Routes, RouterModule } from '@angular/router';
import { AirlineGetterService } from './Airline/Services/AirlineGetter/airline-getter.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarUnregisteredComponent } from './Shared/NavBars/nav-bar-unregistered/nav-bar-unregistered.component';


@NgModule({
  declarations: [
    AppComponent,
    AirlineDetailsComponent,
    MainComponent,
    AirlineMainComponent,
    AirlineHolderComponent,
    AirlineFilterComponent,
    AirlineSearchComponent,
    AirlinePanelComponent,
    NavBarUnregisteredComponent

  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
