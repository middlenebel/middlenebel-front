import { Component, Input, enableProdMode, ElementRef, ViewChild } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';

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
                  <input class="question-value" #inputField value="{{ this.value }}">
          </div>
          <div class="questionFoot">
            <button (click)="onCancel($event)" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
              Cancel
            </button>
            <button (click)="onDoIt($event)">
              Do it!!!
            </button>
        </div>
      </div>
      </ng-template>
    </span>
  `,
  styleUrls: ['./question.component.css'],
  standalone: true,
  imports: [OverlayModule, CommonModule],
})
export class QuestionComponent {
  @Input() message: string = "Input a value";
  @Input() value: string = "Value";
  @Input() hideInput: boolean = false;
  @Input() callBack: any;

  cancelled : boolean = false;
  isOpen: boolean = true;

  ngOnInit(){
    enableProdMode();
    console.log("Question hideInput = "+this.hideInput);
  }

  onCancel(event: any){
    this.isOpen = false;
    console.log("Question value = "+this.value);
  }
  @ViewChild('inputField') inputField?:ElementRef;
  onDoIt(event: any){
    if (!this.hideInput){
      this.value = this.inputField?.nativeElement.value;
    }
    this.isOpen = false;
    console.log("Question value = "+this.value);
    this.callBack.questionDoit(this.value);
  }
}
