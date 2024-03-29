import { Component, Input } from '@angular/core';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-item-kafka',
  template: `
    <div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/kafka.png"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <p class="listing-name">{{data.name}}</p>
      </div>
      <div class="kafka-actions">
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
  styleUrls: ['./item-kafka.component.css']
})
export class ItemKafkaComponent {
  @Input() data: any;
  @Input() core? : ItemCoreComponent;

  onWatch(item: string){
    console.log("Kafka Watch " + item);
    console.log("Kafka.onWatch Actions "+this.data.actions); 
    this.core?.loadActions( this.data, item );
    console.log("Showing watcher...");
    this.core?.showWatcher();
  }

}
