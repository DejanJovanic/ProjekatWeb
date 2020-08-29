import { FormControl } from '@angular/forms';

export function Passport(c : FormControl){
    if(c.value){
       return  /^[a-zA-Z0-9]{0,13}?$/.test(c.value) ? null : {passport : {invalidPassport : false}}
    }
    else
        return null;
}