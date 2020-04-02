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

const appRoutes : Routes = [
  {path : 'Airlines', component: AirlineMainComponent}
]



@NgModule({
  declarations: [
    AppComponent,
    AirlineDetailsComponent,
    MainComponent,
    AirlineMainComponent,
    AirlineHolderComponent,
    AirlineFilterComponent,
    AirlineSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing : true})
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
