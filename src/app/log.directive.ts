import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[logHost]',
})
export class LogDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}