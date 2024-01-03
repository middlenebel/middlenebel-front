import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[browserHost]',
})
export class BrowserDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}