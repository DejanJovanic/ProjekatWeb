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
import { AirlineAdminCompanyPreviewComponent } from './Airline/AirlineAdmin/airline-admin-company-preview/airline-admin-company-preview.component';
import { CompanyEditComponent } from './Airline/AirlineAdmin/company-edit/company-edit.component';

const routes: Routes = [
  {path:'',redirectTo: 'main', pathMatch : 'full'},
  {path : 'main', component : MainComponent, children:[
    {path : 'Airlines', component: AirlineMainComponent},
    {path : 'Friends', component: FriendsMainComponent, resolve:{friends : FriensResolverService}},
    {path : 'AirlineAdmin', component : AirlineAdminMainComponent},
    {path : 'Airplanes', component: AirplanesComponent},
    {path : 'CompanyPreview', component: AirlineAdminCompanyPreviewComponent}
  ]},
  {path: 'AddFlight', component: AddFlightComponent},
  {path:'seats/:id', component: SeatReservationComponent, resolve:{details : SeatResolveService}},
  {path:'seatAssignment/:id', component: SeatAssignmentComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService}},
  {path: 'flightReservationConfirm/:id', component: FlightReservationConfirmationComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService,flights : FlightResolverService}},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'RentACarEnterprises', component: RentACarEnterprisesComponent},
  {path: 'CompanyEdit', component: CompanyEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
