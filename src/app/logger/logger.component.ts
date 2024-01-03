import { Component, NgZone, Input, inject, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CoreService } from '../core.service';
import { ActionInterface } from '../actionInterface';

@Component({
  selector: 'app-logger',
  template: `
    <div class="textEditor-bar">
      <img src="assets/refresh-cw.svg" matTooltip="Reload" class="textEditor-button" (click)="onLoad()">
    </div>
    <textarea #textArea spellcheck="false" matInput class="textEditor" [formControl]="loggerControl" (focus)= "onEndfocus($event)"></textarea>
  `,
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent {
  constructor(private _ngZone: NgZone) {}
  @Input() logContent: any;
  
  @ViewChild('textArea') _textArea?: ElementRef;

  loggerControl = new FormControl('', [Validators.required]);

  coreService: CoreService = inject(CoreService);

  ngOnInit(){
    this.onLoad();
  }
  onLoad(){ //TODO gets from server
    
    this.coreService.doGetLog().then((response: ActionInterface) => {
      console.log("LOGGER reloaded "+ response.result );
      this.logContent = response.message;
    });
    this.loggerControl.setValue( this.logContent );

    const textArea = this._textArea?.nativeElement as HTMLTextAreaElement;
    textArea.focus();
  }
  public onEndfocus(args: any): void {
    //sets cursor position at end of MaskedTextBox
    args.selectionStart=args.selectionEnd = args.maskedValue.length;
  }
}