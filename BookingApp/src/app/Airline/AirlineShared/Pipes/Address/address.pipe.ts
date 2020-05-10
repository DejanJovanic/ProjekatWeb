import { Pipe, PipeTransform } from '@angular/core';
import { AirlineAddress } from 'src/app/Shared/Model/Airlines/AirlineAddress.model';

@Pipe({
  name: 'Address'
})
export class AddressPipe implements PipeTransform {

  transform(value: AirlineAddress): unknown {
    return `${value.street} ${value.streetNo}, ${value.zipCode}, ${value.city}, ${value.country}`
  }

}
