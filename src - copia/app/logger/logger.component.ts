import { Component, NgZone, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logger',
  template: `
    <div class="textEditor-bar">
      <img src="assets/refresh-cw.svg" matTooltip="Reload" class="textEditor-button" (click)="onLoad()">
    </div>
    <textarea spellcheck="false" matInput class="textEditor" [formControl]="loggerControl"></textarea>
  `,
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {
  constructor(private _ngZone: NgZone) {}
  @Input() logContent: any;
  
  loggerControl = new FormControl('', [Validators.required]);

  ngOnInit(){
    this.onLoad();
  }
  onLoad(){ //TODO gets from server
    this.loggerControl.setValue( this.logContent );
  }
}