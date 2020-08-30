import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { LoadWeigthComponent } from './Airline/AirlineAdmin/load-weigth/load-weigth.component';
import { ExtrasComponent } from './Airline/AirlineAdmin/extras/extras.component';
import { EnterPassportComponent } from './Airline/SeatReservation/enter-passport/enter-passport.component';
import { SetDetailsComponent } from './Airline/SeatReservation/set-details/set-details.component';
import { ReservationsMainComponent } from './Airline/AirlineRegistered/reservations-main/reservations-main.component';
import { ReservationsHolderComponent } from './Airline/AirlineRegistered/reservations-holder/reservations-holder.component';
import { ReservationsPanelComponent } from './Airline/AirlineRegistered/reservations-panel/reservations-panel.component';
import { ReservationConfirmationComponent } from './Airline/AirlineRegistered/reservation-confirmation/reservation-confirmation.component';
import { FastFlightHolderComponent } from './Airline/AirlineRegistered/fast-flight-holder/fast-flight-holder.component';
import { FastFlightPanelComponent } from './Airline/AirlineRegistered/fast-flight-panel/fast-flight-panel.component';
import { FastFlightConfirmationComponent } from './Airline/AirlineRegistered/fast-flight-confirmation/fast-flight-confirmation.component';
import { FastReservationsHolderComponent } from './Airline/AirlineRegistered/fast-reservations-holder/fast-reservations-holder.component';
import { FastReservationsPanelComponent } from './Airline/AirlineRegistered/fast-reservations-panel/fast-reservations-panel.component';
import { AirlineDataComponent } from './Airline/AirlineAdmin/airline-data/airline-data.component';
import { AirlineEarningsComponent } from './Airline/AirlineAdmin/airline-earnings/airline-earnings.component';
import { AirlineTicketSaleComponent } from './Airline/AirlineAdmin/airline-ticket-sale/airline-ticket-sale.component';
import { AirlineRatingsComponent } from './Airline/AirlineAdmin/airline-ratings/airline-ratings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { UserPreviewComponent } from './Users/user-preview/user-preview.component';
import { UserDetailsEditComponent } from './Users/user-details-edit/user-details-edit.component';
import { ChangePasswordComponent } from './Users/change-password/change-password.component';
import { AddSeatsComponent } from './Airline/AirlineAdmin/add-seats/add-seats.component';
import { AdminAirlineHolderComponent } from './Airline/AirlineAdmin/admin-airline-holder/admin-airline-holder.component';
import { EnableSeatComponent } from './Airline/AirlineAdmin/enable-seat/enable-seat.component';
import { RentACarDeleteCarModalComponent } from './RentACar/RentACarAdmin/rent-acar-delete-car-modal/rent-acar-delete-car-modal.component';
import { RentACarDeleteBranchModalComponent } from './RentACar/RentACarAdmin/rent-acar-delete-branch-modal/rent-acar-delete-branch-modal.component';
import { RentACarDeleteSOModalComponent } from './RentACar/RentACarAdmin/rent-acar-delete-somodal/rent-acar-delete-somodal.component';
import { RentACarSetDiscountModalComponent } from './RentACar/RentACarAdmin/rent-acar-set-discount-modal/rent-acar-set-discount-modal.component';
import { ValidationDirective } from './Shared/Directives/ValidationDirective/validation.directive';
import { FormSubmitDirective } from './Shared/Directives/FormSubmitDirective/form-submit.directive';
import { ControlErrorComponent } from './Shared/control-error/control-error.component';
import { ControlErrorContainerDirective } from './Shared/Directives/ControlErrorContainerDirective/control-error-container.directive';
import { WholeNumberDirective } from './Shared/Directives/WholeNumberDirective/whole-number.directive';
import { RentACarBranchLocationOnMapComponent } from './RentACar/rent-acar-branch-location-on-map/rent-acar-branch-location-on-map.component';
import { RentACarReservationPreviewModalComponent } from './RentACar/rent-acar-reservation-preview-modal/rent-acar-reservation-preview-modal.component';



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
    RentACarSpecialOfferDetailsModalComponent,
    LoadWeigthComponent,
    ExtrasComponent,
    EnterPassportComponent,
    SetDetailsComponent,
    ReservationsMainComponent,
    ReservationsHolderComponent,
    ReservationsPanelComponent,
    ReservationConfirmationComponent,
    FastFlightHolderComponent,
    FastFlightPanelComponent,
    FastFlightConfirmationComponent,
    FastReservationsHolderComponent,
    FastReservationsPanelComponent,
    AirlineDataComponent,
    AirlineEarningsComponent,
    AirlineTicketSaleComponent,
    AirlineRatingsComponent,
    UserPreviewComponent,
    UserDetailsEditComponent,
    ChangePasswordComponent,
    AddSeatsComponent,
    AdminAirlineHolderComponent,
    EnableSeatComponent,
    RentACarDeleteCarModalComponent,
    RentACarDeleteBranchModalComponent,
    RentACarDeleteSOModalComponent,
    RentACarSetDiscountModalComponent,
    ValidationDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    WholeNumberDirective,
    RentACarBranchLocationOnMapComponent,
    RentACarReservationPreviewModalComponent
  ],
  imports: [
    
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true},CookieService, DatePipe],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [FrameComponent]
})
export class AppModule { }
