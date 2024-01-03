import { Component, Input, enableProdMode } from '@angular/core';
import { ElementInterface } from '../elementInterface';
import {OverlayModule} from '@angular/cdk/overlay';
import { Util } from '../util';
import {NgFor, NgForOf} from "@angular/common";
@Component({
  selector: 'app-watcher',
  template: `
  <div class="watcherContainer" #trigger>
    <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="trigger" [cdkConnectedOverlayOpen]="isOpen">    
      <div class="watcherContent">Attributes
        <button (click)="isOpen = !isOpen" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
          {{isOpen ? "Close" : "Open"}}
        </button>
        <div class="watcher-attributes">
            <p class="watcher-attribute" *ngFor="let key of attributes?.keys()">
              {{key}}: {{attributes?.get( key )}}
            </p>
        </div>
      </div>
    </ng-template>
  </div>
  `,
  standalone: true,
  imports: [OverlayModule, NgFor, NgForOf],
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent {
  @Input() watchItem?: ElementInterface;
  @Input() attributes?: any;

  isOpen: boolean = true;

  ngOnInit(){
    enableProdMode();
  }

  openWatcher(){
    this.isOpen = !this.isOpen;
  }
  closeWatch(){
    this.isOpen = false;
  }
}
