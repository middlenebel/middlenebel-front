import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p (click)="callbackFunction('OK')">
      test works!
    </p>
  `,
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  @Input() callbackFunction!: (args: any) => void;
}
