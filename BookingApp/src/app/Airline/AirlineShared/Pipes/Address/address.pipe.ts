import { Pipe, PipeTransform } from '@angular/core';
import { AirlineAddress } from 'src/app/Shared/Model/Airlines/AirlineAddress.model';

@Pipe({
  name: 'Address'
})
export class AddressPipe implements PipeTransform {

  transform(value: AirlineAddress): unknown {
    if(value == null || value == undefined)
      return "";
    else
      return `${value.street? value.street : ""} ${value.streetNo? value.streetNo : ""}, ${value.zipCode? value.zipCode : ""}, ${value.city? value.city : ""}, ${value.country? value.country : ""}`
  }

}
