import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[childsHost]',
})
export class ChildsDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}