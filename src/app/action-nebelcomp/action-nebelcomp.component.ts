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

/*
https://www.tutorialesprogramacionya.com/angularya/detalleconcepto.php?punto=38&codigo=38&inicio=20
https://material.angular.io/components/categories
*/
@Component({
    selector: 'app-action-nebelcomp',
    template: `
        <div class="actions">
          <div> <h2 class="title">{{ actionsSelected }}</h2>
            <div *ngIf="description!=undefined">
              <p class="description"> {{ this.description }}</p>
            </div>
            <mat-form-field *ngIf="inputNum!=undefined">
              <mat-label>{{inputNum}}</mat-label>
              <input matInput [(ngModel)]="inputNumValue" type="number" placeholder="{{inputNum}}">
            </mat-form-field>
            <mat-form-field *ngIf="optionsArray!=undefined">
              <mat-label>Options:</mat-label>
              <mat-select [(value)]="optionsValue">
                <mat-option *ngFor="let anOption of optionsArray" [value]="anOption">
                  {{anOption}}
                </mat-option>
              </mat-select>
            </mat-form-field>
            <mat-form-field *ngIf="inputText!=undefined">
              <mat-label>{{inputText}}</mat-label>
              <textarea matInput [(ngModel)]="inputTextValue" type="text" placeholder="{{inputText}}">
              </textarea>
            </mat-form-field>
            <button mat-raised-button class="button" *ngIf="buttonLoad!=undefined" (click)="onLoad()">{{buttonLoad}}</button>
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
    styleUrls: ['./action-nebelcomp.component.css'],
    imports: [CommonModule, MatFormFieldModule, MatSelectModule,
        MatInputModule,
        MatButtonModule,
        FormsModule, TestComponent, QuestionComponent]
})
export class ActionNebelCompComponent {
  @Input() actionsItem?: ElementInterface;
  @Input() actionsSelected? : string;
  @Input() core? : ItemCoreComponent;

  options? : string= undefined;
  optionsArray?: string[]= undefined;
  optionsValue? : string= undefined;
  description? : string= undefined;
  buttonRun? : string= undefined;
  buttonLoad? : string= undefined;
  inputNum? : string= undefined;
  inputText? : string= undefined;
  inputNumValue? : string= "";
  inputTextValue? : string= "";
  message? : string = undefined;

  coreService: CoreService = inject(CoreService);

  @ViewChild('question') _question?: QuestionComponent;

  ngOnInit() : void {
    console.log("ActionNebelCompComponent Childs "+this.actionsItem?.childs.length);
    for (let children of this.actionsItem?.childs! ){
      if (children.name === this.actionsSelected){
        console.log("ActionNebelCompComponent Childs ");
        this.options = Util.getAtt( children?.attributes, "options");
        this.optionsArray = this.options?.split("#");
        console.log("Options "+this.options);
        console.log("Options "+this.optionsArray?.length);
        this.description = Util.getAtt( children?.attributes, "description");
        this.buttonRun =  Util.getAtt(children?.attributes, "buttonRun");
        this.buttonLoad =  Util.getAtt(children?.attributes, "buttonLoad");
        this.inputNum =  Util.getAtt(children?.attributes, "inputNum");
        this.inputText =  Util.getAtt(children?.attributes, "inputText");
        this.inputNumValue =  Util.getAtt(children?.attributes, "inputNumValue");
        this.inputTextValue =  Util.getAtt(children?.attributes, "inputTextValue");
      }
    }
  }
  onLoad(){
    const actionToExecute : ExecuteActionInterface = { 
      action: this.actionsSelected!,
      data: JSON.stringify( {
        command : 'Load'
      })
    };
    this.doAction( actionToExecute );
  }
  onRun(){
    const actionToExecute : ExecuteActionInterface = { 
      action: this.actionsSelected!,
      data: JSON.stringify( {
        command : 'Run',
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
