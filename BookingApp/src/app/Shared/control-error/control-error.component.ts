import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  template: `<p class="form-text text-danger" [hidden]="_hide">{{_text}}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
 })
 export class ControlErrorComponent {
  _text: string;
  _hide = true;
 
  @Input() set text(value) {
    if (value !== this._text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  };
 
  constructor(private cdr: ChangeDetectorRef) { }
 
 }
