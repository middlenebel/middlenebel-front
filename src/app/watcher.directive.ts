import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[watcherHost]',
})
export class WatcherDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}