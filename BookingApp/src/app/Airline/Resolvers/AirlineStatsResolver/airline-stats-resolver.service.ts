import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AirlineDataService } from '../../AirlineAdmin/Services/AirlineData/airline-data.service';
import { AirlineAdminNetworkService } from '../../AirlineAdmin/Services/AirlineAdminNetwork/airline-admin-network.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineStatsResolverService implements Resolve<any> {

  constructor(private network : AirlineAdminNetworkService,private data : AirlineDataService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.data.GetData()
  }
}
