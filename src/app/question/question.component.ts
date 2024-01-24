import { Component, Input, enableProdMode, ElementRef, ViewChild } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-question',
  template: `
    <span #myOrigin>
      <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="myOrigin" [cdkConnectedOverlayOpen]="isOpen">
      <div class="questionContainer" #myOrigin>
        <div class="questionHeader">
          <div class="question-icon">
            <img class="question-image" src="assets/message-square-exclamation-svgrepo-com.svg">
          </div>
          <div class="question-description">
            <!-- <mat-label class="question-heading">{{ this.message }}</mat-label> -->
            <h2 class="question-message">{{ this.message }}</h2>
            
          </div>
        </div>
          <div class="question-value-space" *ngIf="!this.hideInput">
          <mat-form-field>
              <input matInput class="question-value" #inputField value="{{ this.value }}">
              <!-- <mat-form-field *ngIf="!hideInput">
                <mat-label>{{value}}</mat-label>
                <input matInput [(ngModel)]="value" type="text" placeholder="{{value}}">
              </mat-form-field> -->
              </mat-form-field>
          </div>
          <div class="questionFoot">
            <button mat-raised-button (click)="onCancel($event)" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
              Cancel
            </button>
            <button mat-raised-button (click)="onDoItClick($event)">
              Do it!!!
            </button>
        </div>
      </div>
      </ng-template>
    </span>
  `,
  styleUrls: ['./question.component.css'],
  standalone: true,
  imports: [OverlayModule, CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, FormsModule]
})
export class QuestionComponent {
  @Input() message: string = "Input a value";
  @Input() value: string = "Value";
  @Input() hideInput: boolean = false;
  @Input() callBack: any;
  @Input() onDoIt!: (args: any) => void;
  @Input() isOpen: boolean = false;

  cancelled : boolean = false;
  // isOpen: boolean = true;

  show(){
    this.isOpen = true;
  }

  ngOnInit(){
    enableProdMode();
    console.log("Question hideInput = "+this.hideInput);
  }

  onCancel(event: any){
    this.isOpen = false;
    console.log("Question value = "+this.value);
  }

  @ViewChild('inputField') inputField?:ElementRef;

  onDoItClick(event: any) {
    if (!this.hideInput){
      this.value = this.inputField?.nativeElement.value;
    }
    console.log("Question value = "+this.value);
    // console.log("Question callBack = "+this.callBack);
    // console.log("Question onDoIt = "+this.onDoIt);
    this.isOpen = false;
    if (this.callBack!=undefined){
      this.callBack.questionDoit(this.value);
    }
    if (this.onDoIt)
      this.onDoIt(this.value);
  }
}
