import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { AirlineMainComponent } from './Airline/AirlineShared/airline-main/airline-main.component';
import { FriensResolverService } from './Users/Services/FriendsResolver/friens-resolver.service';
import { AirlineAdminMainComponent } from './Airline/AirlineAdmin/airline-admin-main/airline-admin-main.component';
import { SeatReservationComponent } from './Airline/SeatReservation/seat-reservation/seat-reservation.component';
import { SeatResolveService } from './Airline/Resolvers/SeatResolve/seat-resolve.service';
import { SeatAssignmentComponent } from './Airline/SeatReservation/seat-assignment/seat-assignment.component';
import { ReservationResolverService } from './Airline/Resolvers/ReservationResolver/reservation-resolver.service';
import { FlightReservationConfirmationComponent } from './Airline/SeatReservation/flight-reservation-confirmation/flight-reservation-confirmation.component';
import { FlightResolverService } from './Airline/Resolvers/FlightResolver/flight-resolver.service';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { FriendsMainComponent } from './Users/Friends/friends-main/friends-main.component';
import { AddFlightComponent } from './Airline/AirlineAdmin/add-flight/add-flight.component';
import { AirplanesComponent } from './Airline/AirlineAdmin/airplanes/airplanes.component';
import { RentACarEnterprisesComponent } from './RentACar/RentACarEnterpriseList/rent-acar-enterprises/rent-acar-enterprises.component'
import { RentACarEnterpriseProfileComponent } from './RentACar/RentACarEnterpriseProfile/rent-acar-enterprise-profile/rent-acar-enterprise-profile.component'
import { RentACarEnterpriseAllCarsComponent } from './RentACar/RentACarEnterpriseCars/rent-acar-enterprise-all-cars/rent-acar-enterprise-all-cars.component'
import { RentACarEnterpriseSpecialServiceComponent } from './RentACar/RentACarEnterpriseSpecialOffer/rent-acar-enterprise-special-service/rent-acar-enterprise-special-service.component'
import { AirlineAdminCompanyPreviewComponent } from './Airline/AirlineAdmin/airline-admin-company-preview/airline-admin-company-preview.component';
import { CompanyEditComponent } from './Airline/AirlineAdmin/company-edit/company-edit.component';
import { RentACarEnterpriseLocationOnMapComponent } from './RentACar/RentACarEnterpriseLocation/rent-acar-enterprise-location-on-map/rent-acar-enterprise-location-on-map.component';
import { RentACarBranchesComponent } from './RentACar/RentACarListOfBranches/rent-acar-branches/rent-acar-branches.component';
import { EditFastReservationSeatsComponent } from './Airline/AirlineAdmin/edit-fast-reservation-seats/edit-fast-reservation-seats.component';
import { RentACarReservationComponent } from './RentACar/RentACarSetReservation/rent-acar-reservation/rent-acar-reservation.component';
import { RentACarDiscountsComponent } from './RentACar/RentACarEnterpriseDiscounts/rent-acar-discounts/rent-acar-discounts.component';
import { RentACarAdminEnterpriseComponent } from './RentACar/RentACarAdmin/rent-acar-admin-enterprise/rent-acar-admin-enterprise.component';
import { RemoveSeatComponent } from './Airline/AirlineAdmin/remove-seat/remove-seat.component';
import { DisableSeatComponent } from './Airline/AirlineAdmin/disable-seat/disable-seat.component';
import { ReservationsMainComponent } from './Airline/AirlineRegistered/reservations-main/reservations-main.component';
import { ReservationConfirmationComponent } from './Airline/AirlineRegistered/reservation-confirmation/reservation-confirmation.component';
import { FastFlightHolderComponent } from './Airline/AirlineRegistered/fast-flight-holder/fast-flight-holder.component';
import { FastFlightConfirmationComponent } from './Airline/AirlineRegistered/fast-flight-confirmation/fast-flight-confirmation.component';
import { AirlineDataComponent } from './Airline/AirlineAdmin/airline-data/airline-data.component';
import { AirlineEarningsComponent } from './Airline/AirlineAdmin/airline-earnings/airline-earnings.component';
import { AirlineTicketSaleComponent } from './Airline/AirlineAdmin/airline-ticket-sale/airline-ticket-sale.component';
import { AirlineRatingsComponent } from './Airline/AirlineAdmin/airline-ratings/airline-ratings.component';
import { AirlineStatsResolverService } from './Airline/Resolvers/AirlineStatsResolver/airline-stats-resolver.service';
import { UserPreviewComponent } from './Users/user-preview/user-preview.component';
import { UserDetailsEditComponent } from './Users/user-details-edit/user-details-edit.component';
import { ChangePasswordComponent } from './Users/change-password/change-password.component';
import { AddSeatsComponent } from './Airline/AirlineAdmin/add-seats/add-seats.component';
import { EnableSeatComponent } from './Airline/AirlineAdmin/enable-seat/enable-seat.component';
import { UserDataResolverService } from './Shared/Resolvers/UserDataResolver/user-data-resolver.service';
import { AirlineAdminDataResolverService } from './Airline/Resolvers/AirlineAdminDataResolver/airline-admin-data-resolver.service';
import { FlightDetailsComponent } from './Airline/AirlineShared/flight-details/flight-details.component';


const routes: Routes = [
  {path:'', redirectTo: 'main', pathMatch : 'full'},
    {path : 'main', component : MainComponent, children:[
      {path : 'Airlines', component: AirlineMainComponent},
      {path : 'Friends', component: FriendsMainComponent, resolve:{friends : FriensResolverService}},
      {path : 'AirlineAdmin', component : AirlineAdminMainComponent,resolve:{data : AirlineAdminDataResolverService}},
      {path : 'CompanyPreview', component: AirlineAdminCompanyPreviewComponent},
      {path : 'Reservations', component: ReservationsMainComponent},
      {path : 'Stats', component: AirlineDataComponent, resolve:{data : AirlineStatsResolverService},children:[
        {path : 'AirlineRatings', component: AirlineRatingsComponent},
        {path : 'AirlineTicketSale', component: AirlineTicketSaleComponent},
        {path : 'AirlineEarnings', component: AirlineEarningsComponent}
      ]}
    ]},
    {path : 'changePassword/:username', component : ChangePasswordComponent},
    {path : 'UserPreview', component : UserPreviewComponent},
    {path : 'UserDetailsEdit', component : UserDetailsEditComponent},
    {path : 'FastFlights/:airlineId', component : FastFlightHolderComponent},
    {path : 'FastFlightConfirmation/:flightId/:fastFlightId', component : FastFlightConfirmationComponent,resolve:{details : SeatResolveService}},
    {path : 'AddSeats/:id', component: AddSeatsComponent,resolve:{details : SeatResolveService}},
    {path : 'ManageInvitation/:airlineId/:flightId/:ticketId', component : ReservationConfirmationComponent,resolve:{details : SeatResolveService}},
    {path : 'RemoveSeat/:id', component: RemoveSeatComponent,resolve:{details : SeatResolveService}},
    {path : 'DisableSeat/:id', component: DisableSeatComponent,resolve:{details : SeatResolveService}},
    {path : 'EnableSeat/:id', component: EnableSeatComponent,resolve:{details : SeatResolveService}},
    {path: 'AddFlight', component: AddFlightComponent},
    {path: 'FlightDetails/:id',component: FlightDetailsComponent,resolve: {details : SeatResolveService}},
    {path:'seats/:id', component: SeatReservationComponent, resolve:{details : SeatResolveService}},
    {path:'seatAssignment/:id', component: SeatAssignmentComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService}},
    {path: 'flightReservationConfirm/:id', component: FlightReservationConfirmationComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService,flights : FlightResolverService}},
    {path: 'Login', component: LoginComponent},
    {path: 'Register', component: RegisterComponent},
    {path: 'RentACarEnterprises', component: RentACarEnterprisesComponent},
    {path: 'EnterpriseProfile/:id', component: RentACarEnterpriseProfileComponent},
    {path: 'EnterpriseCars/:id', component: RentACarEnterpriseAllCarsComponent},
    {path: 'EnterpriseSpecialOffers/:id', component: RentACarEnterpriseSpecialServiceComponent},
    {path: 'EnterpriseLocation/:id', component: RentACarEnterpriseLocationOnMapComponent},
    {path: 'EnterpriseBranches/:id', component: RentACarBranchesComponent},
    {path: 'EnterpriseRentACar/:id', component: RentACarReservationComponent},
    {path: 'EnterpriseDiscounts/:id', component: RentACarDiscountsComponent},
    {path: 'RentACarEnterpriseAdmin', component: RentACarAdminEnterpriseComponent},
    {path: 'CompanyEdit', component: CompanyEditComponent},
    {path: 'EditFastReservationSeats/:id', component: EditFastReservationSeatsComponent, resolve:{details : SeatResolveService}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
