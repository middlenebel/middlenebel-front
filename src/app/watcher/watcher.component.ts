import { Component, Input, } from '@angular/core';
import { ElementInterface } from '../elementInterface';
import {OverlayModule} from '@angular/cdk/overlay';
import { Util } from '../util';
import {NgFor, NgForOf} from "@angular/common";
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
  `,
  standalone: true,
  imports: [OverlayModule, NgFor, NgForOf],
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent {
  @Input() watchItem?: ElementInterface;
  @Input() attributes?: any;

  ngOnInit(){
  }
}
