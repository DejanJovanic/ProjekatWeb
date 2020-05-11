import { AbstractControl, FormControl } from '@angular/forms';

export function EmptyStringField(c : FormControl){
    let value = c.value as string;
    return value.trim() == "" ? {emptyString : true} : null
}