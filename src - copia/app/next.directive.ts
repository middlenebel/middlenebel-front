import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[nextHost]',
})
export class NextDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}