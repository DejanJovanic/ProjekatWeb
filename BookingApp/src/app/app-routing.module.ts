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

const routes: Routes = [
  {path:'',redirectTo: 'main', pathMatch : 'full'},
  {path : 'main', component : MainComponent, children:[
    {path : 'Airlines', component: AirlineMainComponent}
  ]},
  {path:'seats/:id', component: SeatReservationComponent, resolve:{details : SeatResolveService}},
  {path:'seatAssignment', component: SeatAssignmentComponent},
  {path: 'flightReservationConfirm', component: FlightReservationConfirmationComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
