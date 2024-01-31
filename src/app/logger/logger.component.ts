import { Component, NgZone, Input, inject, ViewChild, ElementRef, enableProdMode } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CoreService } from '../core.service';
import { ActionInterface } from '../actionInterface';

@Component({
  selector: 'app-logger',
  template: `
    <div class="textEditor-bar">
      <img src="assets/refresh-cw.svg" matTooltip="Refresh log" class="textEditor-button" (click)="onLoad()">
      <img src="assets/trash-alt.svg" matTooltip="Clear log" class="textEditor-button" (click)="onClear()">
    </div>
    <textarea #textArea spellcheck="false" matInput class="textEditor" [formControl]="loggerControl" 
    (focus)= "onEndfocus($event)">
  </textarea>
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
    console.log("Logger.ngOnInit");
    enableProdMode();
    this.onLoad();
  }
  onLoad(){
    console.log("Logger.onLoad");
    this.coreService.doGetLog().then((response: ActionInterface) => {
      if (response.result=="OK"){
        console.log("LOGGER reloaded "+ response.result ); //DEBUG +" "+response.message);
        this.logContent = response.message;
      }else if (response.result=="SERVER-OUT"){
          this.logContent = "Server not connected!\n\n Middlenebel - Front.\t Version a.0.2.\n\n "+
          " Middlenebel is and IaC (Infrastructure as Code) for desktop environments.\n\n"+
          " Enjoy deploying servers in your local DockerDesktop and Kubernetes.";

      }else{
        this.logContent = response.message;
      }
      const textArea = this._textArea?.nativeElement as HTMLTextAreaElement;
      textArea.value = this.logContent;
      textArea?.focus();
    });
  }
  onClear(){
    console.log("Logger.clear");
    this.coreService.doClearLog().then((response: ActionInterface) => {
      console.log("LOGGER cleared "+ response.result ); //DEBUG +" "+response.message);
      this.logContent = response.message;
      const textArea = this._textArea?.nativeElement as HTMLTextAreaElement;
      textArea.value = this.logContent;
      textArea?.focus();
    });
  }

  public onEndfocus(args: any): void {
    if ( args == undefined ){
        return;
    }
    //sets cursor position at end of MaskedTextBox
    args.selectionStart=args.selectionEnd = args.maskedValue?.length;
  }
}