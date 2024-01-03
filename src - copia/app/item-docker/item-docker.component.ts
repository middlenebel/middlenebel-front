import { Component, Input } from '@angular/core';

import { ElementComponent } from '../element.component';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-item-docker',
  template: `
    <div class="element">
      <div class="listing-icon">
        <img class="listing-image" src="/assets/docker-desktop.png"/>
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
  styleUrls: ['./item-docker.component.css']
})
export class ItemDockerComponent  implements ElementComponent{
  @Input() data: any;
  @Input() index: any;
  @Input() core? : ItemCoreComponent;

  ngOnInit() : void {
    console.log("DOCKER " + this.data.className);
  }
}