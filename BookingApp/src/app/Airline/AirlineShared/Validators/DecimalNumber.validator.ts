import { FormControl } from '@angular/forms';

export function DecimalNumber(c : FormControl){
    if(c.value){
       return  /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(c.value) ? null : {decimalNumber : {isDecimalNumber : false}}
    }
    else
        return null;
}