import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AirlineDataService } from '../../AirlineAdmin/Services/AirlineData/airline-data.service';
import { AirlineAdminNetworkService } from '../../AirlineAdmin/Services/AirlineAdminNetwork/airline-admin-network.service';
import { AirlineAdminDataService } from '../../AirlineAdmin/Services/AirlineAdminData/airline-admin-data.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineAdminDataResolverService implements Resolve<any> {

  constructor(private network : AirlineAdminNetworkService,private data : AirlineAdminDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.data.GetAirlineData()
  }
}
