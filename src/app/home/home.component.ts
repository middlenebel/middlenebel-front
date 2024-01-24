import { Component, inject, ViewChild, OnInit, } from '@angular/core';

import { ElementInterface } from '../elementInterface';
import { ElementService } from '../element.service';
import { ElementDirective } from '../element.directive';
import { MoskisElementComponent } from '../moskis-element/moskis-element.component';
import { Util } from '../util';

//ng generate component test --standalone --inline-template --skip-tests
//ng generate component item-mysql --inline-template --skip-tests
//

@Component({
  selector: 'app-home',
  providers: [],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Search" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
      <ng-template elementHost>UNLOADED SYSTEM</ng-template>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  elementService: ElementService = inject(ElementService);
  filteredElementList: ElementInterface[] = [];

  @ViewChild(ElementDirective, {static: true}) elementHost!: ElementDirective;
  
  constructor() {
    this.filteredElementList = Util.elements;

    this.elementService.getAllElements().then((receivedList: ElementInterface[]) => {
      Util.elements = receivedList;
      this.filteredElementList = receivedList;
      console.log("HOME: Data received from server!");
      this.loadComponent();
    });
  }

  ngOnInit(){ 
    console.log("HOME OnInit!"); 
    this.loadComponent();
  }

  loadComponent() {
    const viewContainerRef = this.elementHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(MoskisElementComponent);
    componentRef.instance.index = 0;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredElementList = Util.elements
    }
  
    this.filteredElementList = this.filteredElementList.filter(
      element => element?.className.toLowerCase().includes(text.toLowerCase())
    );
  }
}
