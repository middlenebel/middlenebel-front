import { Component, Input } from '@angular/core';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-item-nebelcomp',
  template: `
<div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/programming-svgrepo-com.svg"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <!-- <p class="listing-name">{{data.name}}</p> -->
          <p class="listing-name">{{data.name}}</p>
      </div>
      <!-- <div class="k8s-deployments">
          <p class="k8s-deploy" *ngFor="let item of data.deployments"  (click)="onWatch( item )"
          matTooltip="{{getAtt(item.attributes, 'image')}} in {{getAtt(item.attributes, 'containerPort')}}">
              {{getAtt(item.attributes, 'name')}}
          </p>
      </div> -->
      <div class="kafka-actions">
          <!-- <p class="k8s-deploy" *ngFor="let item of data.deployments"
          matTooltip="{{item.attributes.get('image')}} in {{item.attributes.get('containerPort')}}"> -->
          <p class="kafka-action" *ngFor="let item of this.data.actions"  (click)="onWatch( item )"
          matTooltip="{{ item }}">
            {{ item }}
          </p>
      </div>
      <div class="watcher">
        <ng-template watcherHost>UNLOADED SYSTEM</ng-template>
      </div>
    </div>
    <span> <ng-template childsHost>UNLOADED ELEMENT</ng-template> </span>
  `,
  styleUrls: ['./item-nebelcomp.component.css']
})
export class ItemNebelcompComponent {
  @Input() data: any;
  @Input() core? : ItemCoreComponent;

  onWatch(item: string){
    console.log("nebelcomp Watch " + item);
    console.log("nebelcomp.onWatch Actions "+this.data.actions); 
    this.core?.loadActions( this.data, item );
    this.core?.showWatcher();
  }
}
