import { FormControl } from '@angular/forms';

export function EmptyStringField(c : FormControl){
    if(c && c.value){
        let value = c.value as string;
        return value.trim() == "" ? {emptyString : {isEmpty : true}} : null
    }
    else
        return {emptyString : true}
}