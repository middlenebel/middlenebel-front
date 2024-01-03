import { Component, Input, ViewChild } from '@angular/core';
import { ElementComponent } from '../element.component';
import { ItemCoreComponent } from '../item-core/item-core.component';
import { MoskisChildComponent } from '../moskis-child/moskis-child.component';
import { ChildsDirective } from '../childs.directive';

@Component({
  selector: 'app-item-platform',
  template: `
    <div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/platform.png"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <p class="listing-name">{{data.name}}</p>
      </div>
    </div>
    <div class="childs">
        <ng-template childsHost>UNLOADED ELEMENT</ng-template>
    </div>
  `,
  styleUrls: ['./item-platform.component.css']
})
export class ItemPlatformComponent  implements ElementComponent{
  @Input() data: any;
  @Input() index: any;
  @Input() core? : ItemCoreComponent;

  @ViewChild(ChildsDirective, {static: true}) childsHost!: ChildsDirective;

  ngOnInit() : void {
    console.log("PLATFORM " + this.data.name);
    this.loadChilds();
  }

  loadChilds() {
    console.log("PLATFORM Childs " + 
      this.data.childs.length);
    if (this.data.childs.length == 0) return;
    const viewContainerRef = this.childsHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(MoskisChildComponent);
    componentRef.instance.parentData = this.data;
    componentRef.instance.indexChild = 0;
    componentRef.instance.core = this.core;
  }
}