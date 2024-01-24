import { Component, NgZone, Input, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ElementService } from '../element.service';
import { ActionInterface } from '../actionInterface';
import { ItemCoreComponent } from '../item-core/item-core.component';

@Component({
  selector: 'app-viewer',
  template: `
    <div class="textEditor-bar">
      <img src="assets/refresh-cw.svg" matTooltip="Reload script" class="textEditor-button" (click)="onLoad()">
      <img src="assets/file-arrow-up.svg" matTooltip="Save" class="textEditor-button" (click)="onSave()">
    </div>
    <textarea spellcheck="false" matInput class="textEditor" [formControl]="textEditor" (keydown)="handleKeydown($event)"></textarea>
  `,
  styleUrls: ['./viewer.component.css'],
})
export class ViewerComponent {
  elementService: ElementService = inject(ElementService);
  constructor(private _ngZone: NgZone) {}
  @Input() script: any;
  @Input() core? : ItemCoreComponent;

  // mainForm = new FormGroup({
  //   title: new FormControl('', [Validators.required]),
  //   caption: new FormControl('', [Validators.required]),
  //   description: new FormControl('', [Validators.required])
  // });
  textEditor = new FormControl('', [Validators.required]);

  ngOnInit(){
    this.textEditor.setValue( this.script );
  }

  onLoad(){
    this.core?.onReload();
  }
  onSave(){
    this.script = this.textEditor.value;
    this.elementService.saveScript(this.textEditor.value || "").then((result: ActionInterface) => {
      console.log("Viewer - SaveScript: " + result.message);
    });
  }
  handleKeydown(event:any) {
    if (event.key == 'Tab') {
        event.preventDefault();
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        // event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
        //event.target.selectionStart = event.target.selectionEnd = start + 1;
        event.target.value = event.target.value.substring(0, start) + "    " + event.target.value.substring(end);
        event.target.selectionStart = event.target.selectionEnd = start + 4;
    }
  }
}
