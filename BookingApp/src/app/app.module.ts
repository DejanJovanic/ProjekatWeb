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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightPanelComponent } from './Airline/flight-panel/flight-panel.component';
import { AirlineCacheService } from './Airline/Services/AirlineCache/airline-cache.service';
import { FrameComponent } from './Shared/frame/frame.component';
import { SeatReservationComponent } from './Airline/seat-reservation/seat-reservation.component';
import { AirlineNetworkService } from './Airline/Services/AirlineNetwork/airline-network.service';
import { AirlineDatabaseService } from './Shared/Model/Airlines/Database/airline-database.service';
import { FlightReservationService } from './Airline/Services/FlightReservation/flight-reservation.service';
import { SeatAssignmentComponent } from './Airline/seat-assignment/seat-assignment.component';
import { FlightUserDetailsComponent } from './Airline/flight-user-details/flight-user-details.component';
import { AirlineConfirmationComponent } from './Airline/airline-confirmation/airline-confirmation.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';

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
    NavBarUnregisteredComponent,
    FlightPanelComponent,
    FrameComponent,
    SeatReservationComponent,
    SeatAssignmentComponent,
    FlightUserDetailsComponent,
    AirlineConfirmationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AirlineCacheService, AirlineNetworkService, AirlineDatabaseService, FlightReservationService],
  bootstrap: [FrameComponent]
})
export class AppModule { }
