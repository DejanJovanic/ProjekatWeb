import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineMainComponent } from './Airline/airline-main/airline-main.component';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { SeatReservationComponent } from './Airline/seat-reservation/seat-reservation.component';
import { SeatAssignmentComponent } from './Airline/seat-assignment/seat-assignment.component';
import { LoginComponent } from './Users/login/login.component';
import { RegisterComponent } from './Users/register/register.component';
import { FlightReservationConfirmationComponent } from './Airline/flight-reservation-confirmation/flight-reservation-confirmation.component';
import { SeatResolveService } from './Airline/Services/SeatResolve/seat-resolve.service';
import { FriensResolverService } from './Users/Services/FriendsResolver/friens-resolver.service';
import { ReservationResolverService } from './Airline/Services/ReservationResolver/reservation-resolver.service';
import { FlightResolverService } from './Airline/Services/FlightResolver/flight-resolver.service';
import { FriendsMainComponent } from './Users/Friends/friends-main/friends-main.component';

const routes: Routes = [
  {path:'',redirectTo: 'main', pathMatch : 'full'},
  {path : 'main', component : MainComponent, children:[
    {path : 'Airlines', component: AirlineMainComponent},
    {path : 'Friends', component: FriendsMainComponent, resolve:{friends : FriensResolverService}}
  ]},
  {path:'seats/:id', component: SeatReservationComponent, resolve:{details : SeatResolveService}},
  {path:'seatAssignment/:id', component: SeatAssignmentComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService}},
  {path: 'flightReservationConfirm/:id', component: FlightReservationConfirmationComponent, resolve:{reservation : ReservationResolverService,friends : FriensResolverService,flights : FlightResolverService}},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
