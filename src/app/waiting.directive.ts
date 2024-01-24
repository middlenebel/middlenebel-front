import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[waitingHost]',
})
export class WaitingDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}