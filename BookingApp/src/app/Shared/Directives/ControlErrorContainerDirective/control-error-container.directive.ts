import { Directive, ViewContainerRef, Optional } from '@angular/core';

@Directive({
  selector: '[controlErrorContainer]'
 })
 export class ControlErrorContainerDirective {
  container: ViewContainerRef;

  constructor(public vcr: ViewContainerRef,
              @Optional() controlErrorContainer: ControlErrorContainerDirective,
  ) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }
 }
