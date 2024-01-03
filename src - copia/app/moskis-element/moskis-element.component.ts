import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef, Inject, TemplateRef } from '@angular/core';
import { ElementDirective } from '../element.directive';
import { NextDirective } from '../next.directive';
import { ElementItem } from '../element.item';
import { Util } from '../util';

@Component({
  selector: 'app-moskis-element',
  template: `<ng-template elementHost>UNLOADED ELEMENT</ng-template><ng-template nextHost>NOTHING</ng-template>`,
  styleUrls: ['./moskis-element.component.css']
})
export class MoskisElementComponent implements OnInit, OnDestroy {
  @Input() index : number=0;

  @ViewChild(ElementDirective, {static: true}) elementHost!: ElementDirective;
  @ViewChild(NextDirective, {static: true}) nextHost!: NextDirective;

  ngOnInit() : void {
    this.loadComponent();
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
  }

  loadComponent() {
    if (Util.elements.length == 0) return;

    const item: ElementItem = Util.getElementComponent( Util.elements[this.index] );

    const viewContainerRef = this.elementHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(item.component);
    componentRef.instance.data = item.data;
    componentRef.instance.index = this.index;

    if (this.index < Util.elements.length-1){
      const nextContainerRef = this.nextHost.viewContainerRef;
      nextContainerRef.clear();
      const nextRef = nextContainerRef.createComponent(MoskisElementComponent);
      nextRef.instance.index = this.index+1;
    }
  }
}
