import { Component, Input, inject, ViewChild, ElementRef } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { ItemCoreComponent } from '../item-core/item-core.component';
import { ElementInterface } from '../elementInterface';
import { ExecuteActionInterface } from '../executeActionInterface';
import { ActionInterface } from '../actionInterface';
import { Util } from '../util';

import { CoreService } from '../core.service';
import { TestComponent } from "../test/test.component";
import { QuestionComponent } from "../question/question.component";

@Component({
    selector: 'app-action-portforward',
    template: `
        <div class="actions">
          <div> <h2 class="title">{{ actionsSelected }}</h2>
            <div *ngIf="description!=undefined">
              <p class="description"> {{ this.description }}</p>
            </div>
            
            <button mat-raised-button class="button" *ngIf="buttonRun!=undefined" (click)="onRun()">{{buttonRun}}</button>
          </div>
          <div *ngIf="message!=undefined">
              <p class="description"> {{ this.message }}</p>
            </div>
        </div>
        <!-- <app-test [callbackFunction]="onTest"></app-test>
        <app-question #question [onDoIt]="onQuestion"></app-question> -->
  `,
    standalone: true,
    styleUrls: ['./action-portforward.component.css'],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule,
        MatInputModule,
        MatButtonModule,
        FormsModule, TestComponent, QuestionComponent]
})
export class ActionPortforwardComponent {
  @Input() actionsItem?: ElementInterface;
  @Input() actionsSelected? : string;
  @Input() core? : ItemCoreComponent;

  description? : string= "Start Portforwad!";
  buttonRun? : string= "Run";
  message? : string = undefined;

  coreService: CoreService = inject(CoreService);

  @ViewChild('question') _question?: QuestionComponent;

  ngOnInit() : void {
    console.log("ActionPortforwardComponent Childs "+this.actionsItem?.childs.length);
    console.log("actionsSelected "+this.actionsSelected);
  }
  onRun(){
    const actionToExecute : ExecuteActionInterface = { 
      action: this.actionsSelected!,
      data: JSON.stringify( {
        command : 'StartPortForward',
      })
    };
    this.doAction( actionToExecute );
  }

  doAction( action: ExecuteActionInterface ){
    this.coreService.doAction( action ).then((response: ActionInterface) => {
      console.log("ACTION "+ response.result + " " + response.message);
      this.message = response.message;
    });
  }

  // onTest = (args: any): void => {
  //   this._question!.isOpen=true;
  // }
  // onQuestion = (args: any): void => {
  //   alert(args);
  // }
}
