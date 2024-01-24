import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <section class="content">
      <img src="assets/Middlenebel-logo.png"> 
      <p><b>IaC</b> for desktop!</p>
      <app-home></app-home>
    </section>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

}
