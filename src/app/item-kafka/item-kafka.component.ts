import { Component, Input } from '@angular/core';
import { WatcherDirective } from '../watcher.directive';
import { ItemCoreComponent } from '../item-core/item-core.component';
import { WatcherComponent } from '../watcher/watcher.component';
import { ElementInterface } from '../elementInterface';
import { Util } from '../util';

@Component({
  selector: 'app-item-kafka',
  template: `
    <div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/kafka.png"/>
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
      <div class="watcher">
        <ng-template watcherHost>UNLOADED SYSTEM</ng-template>
      </div>
    </div>
    <span> <ng-template childsHost>UNLOADED ELEMENT</ng-template> </span>
  `,
  styleUrls: ['./item-kafka.component.css']
})
export class ItemKafkaComponent {
  @Input() data: any;
  @Input() index: any;
  @Input() core? : ItemCoreComponent;
}
