import { Component, Input, ViewChild, ElementRef, inject } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

import { ItemCoreComponent } from '../item-core/item-core.component';
import { ElementInterface } from '../elementInterface';
import { ExecuteActionInterface } from '../executeActionInterface';
import { ActionInterface } from '../actionInterface';
import { Util } from '../util';
import { ConstantPool } from '@angular/compiler';
import { CoreService } from '../core.service';

@Component({
  selector: 'app-action-kafka-consumer',
  template: `
<div class="actions">
          <div> <h2>Consumer</h2>
            Topic: <input class="question-value" #inputTopicConsumer value="{{ getTopic() }}">
            Messages: 
            <textarea #textArea spellcheck="false" matInput class="textEditor" 
              (focus)= "onEndfocus($event)">
            </textarea>
          </div>
          <button class="button" *ngIf="!getRunning()" (click)="onRun()">Run</button>
          <button class="button" *ngIf="getRunning()" (click)="onAbort()">Abort</button>
          Reading {{getTopic()}} - Running: {{getRunning()}}
        </div>
  `,
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  styleUrls: ['./action-kafka-consumer.component.css']
})
export class ActionKafkaConsumerComponent {
  @Input() actionsItem?: ElementInterface;
  @Input() core? : ItemCoreComponent;

  coreService: CoreService = inject(CoreService);

  getRunning(){ return Util.kafkaConsumerRunning; }
  getTopic(){ return Util.kafkaTopicConsumer; }

  ngOnInit() : void {
    console.log("ActionKafkaConsumer");
    if (Util.kafkaConsumerRunning){
      console.log("ActionKafkaConsumer - AUTOSTART");
      this.onRun();
    }
  }

  @ViewChild('inputTopicConsumer') inputTopicConsumer?:ElementRef;
  readValues(){
    if ( this.inputTopicConsumer?.nativeElement.value != ""){
      Util.kafkaTopicConsumer = this.inputTopicConsumer?.nativeElement.value;
    }
  }

  onRun(){
    this.readValues();
    const actionToExecute : ExecuteActionInterface = { 
      action: 'KConsumer',
      data: JSON.stringify( {
        action : 'Consume',
        topic : this.getTopic()
      })
    };
    this.core?.doAction( actionToExecute );
    Util.kafkaConsumerRunning = true;
    this.poll();
  }

  onAbort(){
    Util.kafkaConsumerRunning = false;
    const actionToExecute : ExecuteActionInterface = { 
      action: 'KConsumer',
      data: JSON.stringify( {
        action : 'Abort'
      })
    };
    this.core?.doAction( actionToExecute );
  }

  @ViewChild('textArea') _textArea?: ElementRef;
  updateEveryMs = 1000;  
  runLaunched = false;
  async poll() {
    if (this.runLaunched) return;
    this.runLaunched = true;
    while (Util.kafkaConsumerRunning) {
      //DEBUG console.log("Polling...");
      const actionToExecute : ExecuteActionInterface = { 
        action: 'KConsumer',
        data: JSON.stringify( {
          action : 'Get'
        })
      };
      // this.core?.doAction( actionToExecute );
      this.coreService.doAction( actionToExecute ).then((response: ActionInterface) => {
        if (response.result === "KO"){
          console.log("ERROR "+ response.result + " " + response.message);
          this.onAbort();
        }else{
          //DEBUG console.log("ACTION "+ response.result + " " + response.message);
          const textArea = this._textArea?.nativeElement as HTMLTextAreaElement;
          textArea.value = response.message;
          textArea?.focus();
        }
      });
      await this.sleep(this.updateEveryMs);
    }
    this.runLaunched = false;
  }
  sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public onEndfocus(args: any): void {
    if ( args == undefined ){
        return;
    }
    //sets cursor position at end of MaskedTextBox
    args.selectionStart=args.selectionEnd = args.maskedValue?.length;
  }
}
