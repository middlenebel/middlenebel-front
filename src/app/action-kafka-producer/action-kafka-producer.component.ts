import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { ItemCoreComponent } from '../item-core/item-core.component';
import { ElementInterface } from '../elementInterface';
import { ExecuteActionInterface } from '../executeActionInterface';
import { Util } from '../util';

@Component({
  selector: 'app-action-kafka',
  template: `
        <div class="actions">
          <div> <h2>Producer</h2>
            Topic: <input class="question-value" #inputTopic value="{{ getTopic() }}">
            <mat-form-field>
              <mat-label>Producer mode:</mat-label>
              <mat-select [(value)]="selected">
                <mat-option value="Manual">Manual</mat-option>
                <mat-option value="Auto">Auto</mat-option>
              </mat-select>
            </mat-form-field>

            Message: <input class="question-value" #inputMessage value="{{ this.message }}">
            <div *ngIf="selected=='Auto'">
              Max (0 = Continously): <input class="question-value" #inputMax value="{{ this.max }}">
              Interval (ms): <input class="question-value" #inputInt value="{{ this.interval }}">
            </div>
            <button class="button" *ngIf="selected=='Manual'" (click)="onSend()">Send</button>
            <button class="button" *ngIf="(selected=='Auto')&& !getRunning()" (click)="onRun()">Run</button>
            <button class="button" *ngIf="getRunning()" (click)="onAbort()">Abort</button>
          </div>
        </div>
  `,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./action-kafka-producer.component.css']
})
export class ActionKafkaProducerComponent {
  @Input() actionsItem?: ElementInterface;
  @Input() core? : ItemCoreComponent;

  selected = "Manual";
  numSend = 0;
  max = 100;
  interval = 1000;
  message = Util.kafkaMessageProducer;

  // topic = Util.kafkaTopicProducer;
  // running = Util.kafkaProducerRunning;
  getRunning(){ return Util.kafkaProducerRunning; }
  getTopic(){ return Util.kafkaTopicProducer; }

  ngOnInit() : void {
    console.log("ActionKafkaProducer");
  }

  @ViewChild('inputTopic') inputTopic?:ElementRef;
  @ViewChild('inputMessage') inputMessage?:ElementRef;
  @ViewChild('inputMax') inputMax?:ElementRef;
  @ViewChild('inputInt') inputInt?:ElementRef;
  readValues(){
    Util.kafkaTopicProducer = this.inputTopic?.nativeElement.value;
    this.message = this.inputMessage?.nativeElement.value;
    this.max = Number( this.inputMax?.nativeElement.value );
    this.interval = Number( this.inputInt?.nativeElement.value );
    Util.kafkaMessageProducer = this.message;
  }
  onSend(){
    this.readValues();
    const actionToExecute : ExecuteActionInterface = { 
      action: 'KProducer',
      data: JSON.stringify( {
        mode : 'Manual',
        topic : this.getTopic(),
        message : this.message
      })
    };
    this.core?.doAction( actionToExecute );
  }
  onRun(){
    this.readValues();
    const actionToExecute : ExecuteActionInterface = { 
      action: 'KProducer',
      data: JSON.stringify( {
        mode : 'Auto',
        max : this.max,
        interval : this.interval,
        topic : this.getTopic(),
        message : this.message
      })
    };
    this.core?.doAction( actionToExecute );
    Util.kafkaProducerRunning = true;
  }
  onAbort(){
    const actionToExecute : ExecuteActionInterface = { 
      action: 'KProducer',
      data: JSON.stringify( {
        mode : 'Abort',
      })
    };
    this.core?.doAction( actionToExecute );
    Util.kafkaProducerRunning = false;
  }
}
