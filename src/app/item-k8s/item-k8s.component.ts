import { Component, Input, ViewChild } from '@angular/core';
import { WatcherDirective } from '../watcher.directive';
import { ItemCoreComponent } from '../item-core/item-core.component';
import { WatcherComponent } from '../watcher/watcher.component';
import { ElementInterface } from '../elementInterface';
import { Util } from '../util';

@Component({
  selector: 'app-item-k8s',
  template: `
    <div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/k8s.png"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <!-- <p class="listing-name">{{data.name}}</p> -->
          <p class="listing-name">Api: {{data.versions}}</p>
      </div>
      <div class="k8s-deployments">
          <!-- <p class="k8s-deploy" *ngFor="let item of data.deployments"
          matTooltip="{{item.attributes.get('image')}} in {{item.attributes.get('containerPort')}}"> -->
          <p class="k8s-deploy" *ngFor="let item of data.deployments"  (click)="onWatch( item )"
          matTooltip="{{getAtt(item.attributes, 'image')}} in {{getAtt(item.attributes, 'containerPort')}}">
              {{getAtt(item.attributes, 'name')}}
          </p>
      </div>
      <div class="watcher">
        <ng-template watcherHost>UNLOADED SYSTEM</ng-template>
      </div>
    </div>
    <span> <ng-template childsHost>UNLOADED ELEMENT</ng-template> </span>
  `,
  styleUrls: ['./item-k8s.component.css']
})
export class ItemK8sComponent {
  @Input() data: any;
  @Input() index: any;
  @Input() core? : ItemCoreComponent;

  @ViewChild(WatcherDirective, {static: true}) watcherHost!: WatcherDirective;

  getAtt( attribs: any, name: string){
    return Util.getAtt(attribs, name);
  }

  // onWatch(item: ElementInterface){
  //   console.log("K8S Watch " + item.name);
  //   const viewContainerRef = this.watcherHost.viewContainerRef;
  //   viewContainerRef.clear();
  //   const componentRef = viewContainerRef.createComponent(WatcherComponent);
  //   componentRef.instance.watchItem = item;
  //   componentRef.instance.attributes = new Map(item.attributes);
  //   // componentRef.instance.setItem( item );
  //   this.core?.closeWatch();
  //   this.core?.setWatch( componentRef );
  // }
  onWatch(item: ElementInterface){
    console.log("K8S Watch " + item.name);
    this.core?.loadWatcher(item);
    this.core?.showWatcher();
  }
}


