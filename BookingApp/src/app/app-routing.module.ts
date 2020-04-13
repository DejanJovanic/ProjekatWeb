import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineMainComponent } from './Airline/airline-main/airline-main.component';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { SeatReservationComponent } from './Airline/seat-reservation/seat-reservation.component';
import { SeatAssignmentComponent } from './Airline/seat-assignment/seat-assignment.component';
import { AirlineConfirmationComponent } from './Airline/airline-confirmation/airline-confirmation.component';
import { LoginComponent } from './Users/login/login.component';


const routes: Routes = [
  {path:'',redirectTo: 'main', pathMatch : 'full'},
  {path : 'main', component : MainComponent, children:[
    {path : 'Airlines', component: AirlineMainComponent}
  ]},
  {path:'seats/:id', component: SeatReservationComponent},
  {path:'seatAssignment', component: SeatAssignmentComponent},
  {path: 'reservationConfirm', component: AirlineConfirmationComponent},
  {path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
