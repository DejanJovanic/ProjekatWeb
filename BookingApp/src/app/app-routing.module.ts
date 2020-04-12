import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AirlineMainComponent } from './Airline/airline-main/airline-main.component';
import { MainComponent } from './Shared/MainComponent/main/main.component';
import { SeatReservationComponent } from './Airline/seat-reservation/seat-reservation.component';


const routes: Routes = [
  {path:'',redirectTo: 'main', pathMatch : 'full'},
  {path : 'main', component : MainComponent, children:[
    {path : 'Airlines', component: AirlineMainComponent}
  ]},
  {path:'seats/:id', component: SeatReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
