import { FormControl } from '@angular/forms';

export function Name(c : FormControl){
    if(c){
       return  /^[a-zA-Z-' ]+?$/.test(c.value) ? null : {name : {invalidName : false}}
    }
    else
        return null;
}