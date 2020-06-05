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
import { DatePipe } from '@angular/common'
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
import { AirlineDetailsModalComponent } from './Airline/AirlineShared/airline-details-modal/airline-details-modal.component';
import { AirlineAdminCompanyPreviewComponent } from './Airline/AirlineAdmin/airline-admin-company-preview/airline-admin-company-preview.component';
import { CompanyEditComponent } from './Airline/AirlineAdmin/company-edit/company-edit.component';
import { AddressPipe } from './Airline/AirlineShared/Pipes/Address/address.pipe';
import { RentACarEnterpriseProfileComponent } from './RentACar/RentACarEnterpriseProfile/rent-acar-enterprise-profile/rent-acar-enterprise-profile.component';
import { RentACarEnterpriseAllCarsComponent } from './RentACar/RentACarEnterpriseCars/rent-acar-enterprise-all-cars/rent-acar-enterprise-all-cars.component';
import { EditDestinationsModalComponent } from './Airline/AirlineAdmin/edit-destinations-modal/edit-destinations-modal.component';
import { RentACarDetailsModalComponent } from './RentACar/RentACarCarDetailsModal/rent-acar-details-modal/rent-acar-details-modal.component';
import { RentACarEnterpriseSpecialServiceComponent } from './RentACar/RentACarEnterpriseSpecialOffer/rent-acar-enterprise-special-service/rent-acar-enterprise-special-service.component';
import { RentACarEnterpriseLocationOnMapComponent } from './RentACar/RentACarEnterpriseLocation/rent-acar-enterprise-location-on-map/rent-acar-enterprise-location-on-map.component';
import { RentACarBranchesComponent } from './RentACar/RentACarListOfBranches/rent-acar-branches/rent-acar-branches.component';
import { SeatsComponent } from './Airline/SeatReservation/seats/seats.component';
import { EditFastReservationSeatsComponent } from './Airline/AirlineAdmin/edit-fast-reservation-seats/edit-fast-reservation-seats.component';
import { RemoveSeatComponent } from './Airline/AirlineAdmin/remove-seat/remove-seat.component';
import { RentACarReservationComponent } from './RentACar/RentACarSetReservation/rent-acar-reservation/rent-acar-reservation.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BearerInterceptor } from './Shared/Interceptors/BearerInterceptor/bearer.interceptor';
import { RentACarDiscountsComponent } from './RentACar/RentACarEnterpriseDiscounts/rent-acar-discounts/rent-acar-discounts.component';
import { RentACarAdminEnterpriseComponent } from './RentACar/RentACarAdmin/rent-acar-admin-enterprise/rent-acar-admin-enterprise.component';
import { RentACarEnterpriseEditModalComponent } from './RentACar/RentACarAdmin/rent-acar-enterprise-edit-modal/rent-acar-enterprise-edit-modal.component';
import { RentACarEditSpecialOffersModalComponent } from './RentACar/RentACarAdmin/rent-acar-edit-special-offers-modal/rent-acar-edit-special-offers-modal.component';
import { DisableSeatComponent } from './Airline/AirlineAdmin/disable-seat/disable-seat.component';
import { RentACarAddSpecialOfferModalComponent } from './RentACar/RentACarAdmin/rent-acar-add-special-offer-modal/rent-acar-add-special-offer-modal.component';
import { RentACarEditBranchModalComponent } from './RentACar/RentACarAdmin/rent-acar-edit-branch-modal/rent-acar-edit-branch-modal.component';
import { RentACarAddBranchModalComponent } from './RentACar/RentACarAdmin/rent-acar-add-branch-modal/rent-acar-add-branch-modal.component';
import { RentACarAddCarModalComponent } from './RentACar/RentACarAdmin/rent-acar-add-car-modal/rent-acar-add-car-modal.component';
import { RentACarEditCarModalComponent } from './RentACar/RentACarAdmin/rent-acar-edit-car-modal/rent-acar-edit-car-modal.component';
import { RentACarBranchDetailsModalComponent } from './RentACar/rent-acar-branch-details-modal/rent-acar-branch-details-modal.component';
import { RentACarSpecialOfferDetailsModalComponent } from './RentACar/rent-acar-special-offer-details-modal/rent-acar-special-offer-details-modal.component';

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
    RentACarEnterprisesComponent,
    AirlineDetailsModalComponent,
    AirlineAdminCompanyPreviewComponent,
    CompanyEditComponent,
    AddressPipe,
    RentACarEnterpriseProfileComponent,
    RentACarEnterpriseAllCarsComponent,
    EditDestinationsModalComponent,
    RentACarDetailsModalComponent,
    RentACarEnterpriseSpecialServiceComponent,
    RentACarEnterpriseLocationOnMapComponent,
    RentACarBranchesComponent,
    SeatsComponent,
    EditFastReservationSeatsComponent,
    RemoveSeatComponent,
    RentACarReservationComponent,
    RentACarDiscountsComponent,
    RentACarAdminEnterpriseComponent,
    RentACarEnterpriseEditModalComponent,
    RentACarEditSpecialOffersModalComponent,
    DisableSeatComponent,
    RentACarAddSpecialOfferModalComponent,
    RentACarEditBranchModalComponent,
    RentACarAddBranchModalComponent,
    RentACarAddCarModalComponent,
    RentACarEditCarModalComponent,
    RentACarBranchDetailsModalComponent,
    RentACarSpecialOfferDetailsModalComponent
  ],
  imports: [
    
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    HttpClientModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true},CookieService, DatePipe],
 
  bootstrap: [FrameComponent]
})
export class AppModule { }
