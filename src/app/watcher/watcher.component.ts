import { Component, Input, ViewChild } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgFor, NgForOf} from "@angular/common";

import { ElementInterface } from '../elementInterface';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-watcher',
  template: `
  <div class="watcherContainer">
      <div class="watcherContent">Attributes
        <div class="watcher-attributes">
            <p class="watcher-attribute" *ngFor="let key of attributes?.keys()">
              {{key}}: {{attributes?.get( key )}}
            </p>
        </div>
      </div>
  </div>
  <div>
          <ng-template actionsHost>UNLOADED SYSTEM</ng-template>
        </div>
  `,
  standalone: true,
  imports: [OverlayModule, NgFor, NgForOf],
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent {
  @Input() watchItem?: ElementInterface;
  @Input() attributes?: any;
  @Input() core? : ItemCoreComponent;

  ngOnInit(){
    console.log("WATCH Item " + this.watchItem?.name);
    console.log("WATCH Actions " + this.watchItem?.actions);
  }
}
