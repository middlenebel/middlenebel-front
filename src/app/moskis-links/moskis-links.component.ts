import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-moskis-links',
  template: `
    <p>moskis-links</p>
    <ul>
      <li><a target='blank' href='https://www.typescriptlang.org/docs/handbook/2/objects.html'>TypeScript Objects/Interfaces</a></li>
      <li><a target='blank' href='https://angular.io/guide/inputs-outputs'>TypeScript @Input</a></li>
      <li><a target='blank' href='https://angular.io/guide/property-binding'>TypeScript Property-binding</a></li>
      <li><a target='blank' href='https://angular.io/guide/built-in-directives#ngFor'>TypeScript Directives</a></li>
      <li><a target='blank' href='https://angular.io/guide/template-reference-variables'>TypeScript Reference-variables</a></li>
    </ul>
  `,
  styleUrls: ['./moskis-links.component.css']
})
export class MoskisLinksComponent {

}
