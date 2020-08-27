import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[wholeNumber]'
})
export class WholeNumberDirective {

  constructor() { }
  
  @HostListener('keypress', ['$event'])
  keyPress(event: KeyboardEvent) {

    if(event.charCode == 8 || event.charCode == 13 || event.charCode == 0)
      return null
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
    }
    else
    {
      event.preventDefault()
      return false;
    }
  }
}
