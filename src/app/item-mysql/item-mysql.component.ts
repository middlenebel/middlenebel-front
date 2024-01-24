import { Component, Input } from '@angular/core';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-item-mysql',
  template: `
<div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/dolphing-mysql.png"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <p class="listing-name">{{data.name}}</p>
      </div>
      <div class="actions">
          <p class="action" *ngFor="let item of this.data.actions"  (click)="onWatch( item )"
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
  styleUrls: ['./item-mysql.component.css']
})
export class ItemMysqlComponent {
  @Input() data: any;
  @Input() core? : ItemCoreComponent;

  onWatch(item: string){
    console.log("MySQL Watch " + item);
    console.log("MySQL.onWatch Actions "+this.data.actions); 
    this.core?.loadActions( this.data, item );
    this.core?.showWatcher();
  }
}
