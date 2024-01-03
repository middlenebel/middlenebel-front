import { Component, Input, OnInit, OnDestroy, ViewChild, ViewContainerRef, Inject, TemplateRef } from '@angular/core';
import { ChildsDirective } from '../childs.directive';
import { NextDirective } from '../next.directive';
import { ElementItem } from '../element.item';
import { Util } from '../util';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-moskis-child',
  template: `<ng-template childsHost>UNLOADED ELEMENT</ng-template><ng-template nextHost>NOTHING</ng-template><div class="viewer">`,
  styleUrls: ['./moskis-child.component.css']
})
export class MoskisChildComponent  implements OnInit, OnDestroy {
  @Input() parentData : any;
  @Input() indexChild : number = 0;
  @Input() core? : ItemCoreComponent;

  @ViewChild(ChildsDirective, {static: true}) elementHost!: ChildsDirective;
  @ViewChild(NextDirective, {static: true}) nextHost!: NextDirective;

  ngOnInit() : void {
    this.loadComponent();
  }
  ngOnDestroy() {
  }
  ngAfterViewInit() {
  }

  loadComponent() {
    const item: ElementItem = Util.getElementComponent( this.parentData.childs[this.indexChild] );

    const viewContainerRef = this.elementHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(item.component);
    componentRef.instance.data = item.data;
    componentRef.instance.core = this.core;

    if (this.indexChild < this.parentData.childs.length-1){
      const nextContainerRef = this.nextHost.viewContainerRef;
      nextContainerRef.clear();
      const nextRef = nextContainerRef.createComponent(MoskisChildComponent);
      nextRef.instance.parentData = this.parentData;
      nextRef.instance.indexChild = this.indexChild+1;
      nextRef.instance.core = this.core;
    }
  }
}

