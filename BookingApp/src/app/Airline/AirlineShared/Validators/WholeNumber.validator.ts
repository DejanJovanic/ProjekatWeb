import { FormControl } from '@angular/forms';

export function WholeNumber(c : FormControl){
    if(c){
       return  /^[0-9]+$/.test(c.value) ? null : {wholeNumber : {isWholeNumber : false}}
    }
    else
        return null;
}