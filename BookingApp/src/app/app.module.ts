import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlineDetailsComponent} from './Airline/AirlineShared/airline-details/airline-details.component';
import { AirlinePanelComponent} from './Airline/AirlineShared/airline-panel/airline-panel.component';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { AirlineMainComponent} from './Airline/AirlineShared/airline-main/airline-main.component';
import { AirlineHolderComponent } from './Airline/AirlineShared/airline-holder/airline-holder.component';
import { AirlineFilterComponent} from './Airline/AirlineShared/airline-filter/airline-filter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarUnregisteredComponent } from './Shared/NavBars/nav-bar-unregistered/nav-bar-unregistered.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrameComponent } from './Shared/frame/frame.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import {CookieService} from 'ngx-cookie-service';
import { FriendsMainComponent } from './Users/Friends/friends-main/friends-main.component';
import { FriendsHolderComponent } from './Users/Friends/friends-holder/friends-holder.component';
import { FriendsPanelComponent } from './Users/Friends/friends-panel/friends-panel.component';
import { FriendsPendingRequestComponent } from './Users/Friends/friends-pending-request/friends-pending-request.component';
import { UserSearchComponent } from './Users/user-search/user-search.component';
import { FriendAddModalComponent } from './Users/Friends/friend-add-modal/friend-add-modal.component';
import { AirlineAdminMainComponent } from './Airline/AirlineAdmin/airline-admin-main/airline-admin-main.component';
import { FlightUserDetailsComponent } from './Airline/SeatReservation/flight-user-details/flight-user-details.component';
import { TicketPreviewComponent } from './Airline/SeatReservation/ticket-preview/ticket-preview.component';
import { FlightReservationConfirmationComponent } from './Airline/SeatReservation/flight-reservation-confirmation/flight-reservation-confirmation.component';
import { FriendChooseModalComponent } from './Airline/SeatReservation/friend-choose-modal/friend-choose-modal.component';
import { AirlineSearchComponent } from './Airline/AirlineRegistered/airline-search/airline-search.component';
import { FlightPanelComponent } from './Airline/AirlineShared/flight-panel/flight-panel.component';
import { SeatReservationComponent } from './Airline/SeatReservation/seat-reservation/seat-reservation.component';
import { SeatAssignmentComponent } from './Airline/SeatReservation/seat-assignment/seat-assignment.component';
import { FlightFormComponent } from './Airline/AirlineAdmin/flight-form/flight-form.component';
import { StopsModalComponent } from './Airline/AirlineAdmin/stops-modal/stops-modal.component';
import { AddFlightComponent } from './Airline/AirlineAdmin/add-flight/add-flight.component';
import { AirplanesComponent } from './Airline/AirlineAdmin/airplanes/airplanes.component';
import { AddAirplaneModalComponent } from './Airline/AirlineAdmin/add-airplane-modal/add-airplane-modal.component';
import { AirplanePanelComponent } from './Airline/AirlineAdmin/airplane-panel/airplane-panel.component';
import { RentACarEnterprisesComponent } from './RentACar/RentACarEnterpriseList/rent-acar-enterprises/rent-acar-enterprises.component';

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
    LoginComponent,
    RegisterComponent,
    TicketPreviewComponent,
    FlightReservationConfirmationComponent,
    FriendChooseModalComponent,
    FriendsMainComponent,
    FriendsHolderComponent,
    FriendsPanelComponent,
    FriendsPendingRequestComponent,
    UserSearchComponent,
    FriendAddModalComponent,
    AirlineAdminMainComponent,
    FlightFormComponent,
    StopsModalComponent,
    AddFlightComponent,
    AirplanesComponent,
    AddAirplaneModalComponent,
    AirplanePanelComponent,
    RentACarEnterprisesComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule
  ],
  providers: [CookieService],
  bootstrap: [FrameComponent]
})
export class AppModule { }
