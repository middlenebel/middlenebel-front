import { Component, Input, ViewChild, inject } from '@angular/core';
import { ElementComponent } from '../element.component';
import { ChildsDirective } from '../childs.directive';
import { ViewerDirective } from '../viewer.directive';
import { WatcherDirective } from '../watcher.directive';
import { MoskisChildComponent } from '../moskis-child/moskis-child.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { LoggerComponent } from '../logger/logger.component';
import { WatcherComponent } from '../watcher/watcher.component';
import { Util } from '../util';

import { CoreService } from '../core.service';
import { ActionInterface } from '../actionInterface';
import { ElementInterface } from '../elementInterface';
import { BrowserComponent } from '../browser/browser.component';
import { QuestionComponent } from "../question/question.component";
import { QuestionDirective } from '../question.directive';

@Component({
  selector: 'app-item-core',
  template: `
    <div class="element">
      <div class="core-buttons">
        <img class="core-buttons" src="assets/refresh-cw.svg"  matTooltip="Reload" (click)="onReload()">
        <img class="core-buttons" src="assets/play.svg"  matTooltip="Play" (click)="onPlay()">
        <img class="core-buttons" src="assets/folder-svgrepo-com.svg"  matTooltip="Browser" (click)="loadBrowser()">
        <img class="core-buttons" src="assets/file-code.svg"  matTooltip="Edit" (click)="loadViewer()">
        <img class="core-buttons" src="assets/file-exclamation.svg"  matTooltip="View log" (click)="loadLog()">
      </div>
      <div class="listing-icon">
        <img class="listing-image" src="/assets/default-element.png" (click)="onWatch()"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <!-- <p class="listing-name">{{data.name}}</p> -->
      </div>
      <div class="childs">
        <ng-template childsHost>UNLOADED ELEMENT</ng-template>
      </div>
      <div class="viewer">
        <ng-template viewerHost>UNLOADED SYSTEM</ng-template>
      </div>
      <div class="watcher">
        <ng-template watcherHost>UNLOADED SYSTEM</ng-template>
      </div>
      <div class="question">
        <ng-template questionHost>UNLOADED SYSTEM</ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./item-core.component.css']
})
export class ItemCoreComponent implements ElementComponent{
  @Input() data: any; 
  @Input() index: any;

  coreService: CoreService = inject(CoreService);

  @ViewChild(ChildsDirective, {static: true}) childsHost!: ChildsDirective;
  @ViewChild(ViewerDirective, {static: true}) viewerHost!: ViewerDirective;
  @ViewChild(WatcherDirective, {static: true}) watcherHost!: WatcherDirective;
  @ViewChild(QuestionDirective, {static: true}) questionHost!: QuestionDirective;

  watchComponent : any;

  ngOnInit() : void {
    console.log("CORE " + this.data.className);
    this.loadChilds();
    this.loadLog();
  }

  loadChilds() {
    // console.log("CORE Childs " + Util.elements[this.index].childs.length);
    if (Util.elements.length == 0) return;
    if (Util.elements[this.index].childs.length == 0) return;
    const viewContainerRef = this.childsHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(MoskisChildComponent);
    componentRef.instance.parentData = Util.elements[this.index];
    componentRef.instance.indexChild = 0;
    componentRef.instance.core = this;

    console.log("CORE Core param " + componentRef.instance.core);
  }
  onReload() : void {
    this.coreService.doReload().then((response: ActionInterface) => {
      console.log("RELOAD "+ response.result + " " + response.message);
    });
    window.location.reload();
  }
  onPlay() : void {
    this.showQuestion(this, "Execute script?", "", true);
    // this.coreService.doPlay().then((response: ActionInterface) => {
    //   console.log("PLAY "+ response.result + " " + response.message)
    // });
  }
  questionDoit(newValue:any){
    this.coreService.doPlay().then((response: ActionInterface) => {
      console.log("PLAY "+ response.result + " " + response.message)
    });
  }
  loadBrowser() {
    console.log("CORE Browser ");
    const viewContainerRef = this.viewerHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(BrowserComponent);
    componentRef.instance.folders = Util.elements[this.index].folders;
    componentRef.instance.core = this;
  }
  loadViewer() {
    console.log("CORE Viewer ");
    const viewContainerRef = this.viewerHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(ViewerComponent);
    componentRef.instance.script = Util.elements[this.index].script;
  }
  loadLog() {
    console.log("CORE Log ");
    const viewContainerRef = this.viewerHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(LoggerComponent);
    componentRef.instance.logContent = Util.elements[this.index].logContent;
  }

  onWatch(){
    console.log("CORE Watch ");
    const viewContainerRef = this.watcherHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(WatcherComponent); 
    componentRef.instance.watchItem = Util.elements[this.index];
    componentRef.instance.attributes = new Map(Util.elements[this.index].attributes);
    // componentRef.instance.setItem( Util.elements[this.index] );
    this.closeWatch();
    this.watchComponent = componentRef;
  }

  setWatch(watcher : any){
    console.log("CORE setWatch " + watcher.instance);
    this.watchComponent = watcher;
  }

  closeWatch(){
    console.log("CORE closeWatch " + this.watchComponent);
    this.watchComponent?.instance.closeWatch();
  }

  showQuestion(callBack: any, message: string, value: string, hideInput:boolean = false){
    console.log("BROWSER Question  " + message );
    const viewContainerRef = this.questionHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(QuestionComponent);
    componentRef.instance.message = message;
    componentRef.instance.value = value;
    componentRef.instance.hideInput = hideInput;
    componentRef.instance.callBack = callBack;
  }
}
