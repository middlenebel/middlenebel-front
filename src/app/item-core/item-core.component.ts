import { Component, Input, ViewChild, ElementRef, ComponentRef, inject, enableProdMode } from '@angular/core';
import { ElementComponent } from '../element.component';
import { ChildsDirective } from '../childs.directive';
import { ViewerDirective } from '../viewer.directive';
import { LogDirective } from '../log.directive';
import { WatcherDirective } from '../watcher.directive';
import { BrowserDirective } from '../browser.directive';
import { MoskisChildComponent } from '../moskis-child/moskis-child.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { LoggerComponent } from '../logger/logger.component';
import { WatcherComponent } from '../watcher/watcher.component';
import { ActionPortforwardListComponent } from '../action-portforward-list/action-portforward-list.component';
import { Util } from '../util';

import { CoreService } from '../core.service';
import { ActionInterface } from '../actionInterface';
import { ExecuteActionInterface } from '../executeActionInterface';
import { ElementInterface } from '../elementInterface';
import { BrowserComponent } from '../browser/browser.component';
import { QuestionComponent } from "../question/question.component";
import { WaitingComponent } from "../waiting/waiting.component";
import { QuestionDirective } from '../question.directive';
import { WaitingDirective } from '../waiting.directive';

import { ElementItem } from '../element.item';

@Component({
  selector: 'app-item-core',
  template: `
    <div class="element"> <!--(click)="onBar()">-->
      <div class="core-buttons">
        <img class="core-buttons" src="assets/refresh-cw.svg"  matTooltip="Refresh" (click)="onReload()">
        <img class="core-buttons" src="assets/play.svg"  matTooltip="Deploy" (click)="onPlay()">
        <img class="core-buttons" src="assets/folder-svgrepo-com.svg"  matTooltip="Browser" (click)="showBrowser()">
        <img class="core-buttons" src="assets/file-code.svg"  matTooltip="Edit" (click)="showViewer()">
        <img class="core-buttons" src="assets/file-exclamation.svg"  matTooltip="View log" (click)="showLogger()">
        <img class="core-buttons" src="assets/delete-right-svgrepo-com.svg"  matTooltip="Undeploy" (click)="onDestroy()">
        <img class="core-buttons" src="assets/power-off.svg"  matTooltip="Close server" (click)="onQuit()">
      </div>
      <div class="listing-icon">
        <img class="listing-image" src="/assets/default-element.png" (click)="loadWatcher(); showWatcher()"/>
      </div>
      <div class="listing-description">
          <h2 class="listing-heading">{{data.className}}</h2>
          <div class="listing-actions">
          <p class="listing-portForward" *ngFor="let item of this.data.portForwards"  (click)="adminPortForward()"
            matTooltip="Port-forward {{ item.appName }} {{ item.port }}">
              {{ item.appName }}
          </p>
      </div>
      </div>
      
      <div class="childs">
        <ng-template childsHost>UNLOADED ELEMENT</ng-template>
      </div>
      <div class="rightContainer">
        <div class="viewer" #viewerDiv>
          <ng-template viewerHost>UNLOADED SYSTEM</ng-template>
        </div>
        <div class="logger" #loggerDiv>
          <ng-template logHost>UNLOADED SYSTEM</ng-template>
        </div>
        <div class="watcher" #watcherDiv>
          <ng-template watcherHost>UNLOADED SYSTEM</ng-template>
        </div>
        <div class="browser" #browserDiv>
          <ng-template browserHost>UNLOADED SYSTEM</ng-template>
        </div>
      </div>
      <div class="question">
        <ng-template questionHost>UNLOADED SYSTEM</ng-template>
      </div>
      <div class="waiting">
      <ng-template waitingHost>UNLOADED SYSTEM</ng-template>
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
  @ViewChild(LogDirective, {static: true}) logHost!: LogDirective;
  @ViewChild(WatcherDirective, {static: true}) watcherHost!: WatcherDirective;
  @ViewChild(BrowserDirective, {static: true}) browserHost!: BrowserDirective;
  @ViewChild(QuestionDirective, {static: true}) questionHost!: QuestionDirective;
  @ViewChild(WaitingDirective, {static: true}) waitingnHost!: WaitingDirective;

  @ViewChild("viewerDiv") viewerDiv!: ElementRef;
  @ViewChild("browserDiv") browserDiv!: ElementRef;
  @ViewChild("loggerDiv") loggerDiv!: ElementRef;
  @ViewChild("watcherDiv") watcherDiv!: ElementRef;

  watchComponent : any;
  questionComponent : any;
  waitingComponent : any;
  actionComponent : any;
  loggerComponent : any;
  
  ngOnInit() : void {
    console.log("CORE " + this.data.className);
    enableProdMode();
    this.loadChilds();
    this.loadLogger();
    this.loadBrowser();
    this.loadViewer();
    this.loadWatcher();
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit!");
    this.showLogger();
  }
  hideAll(){
    this.loggerDiv.nativeElement.style.display='none'; //hidden=true;
    this.browserDiv.nativeElement.style.display='none';
    this.viewerDiv.nativeElement.style.display='none';
    this.watcherDiv.nativeElement.style.display='none';
    this.hideQuestion();
    this.hideWaiting();
  }
  hideQuestion(){
    if (this.questionComponent != undefined ){
      this.questionComponent.instance.onCancel(null);
    }
  }
  hideWaiting(){
    if (this.waitingComponent != undefined ){
      this.waitingComponent.instance.onCancel(null);
    }
  }
  showLogger(){ 
    this.hideAll(); 
    this.loggerDiv.nativeElement.style.display='block';
    this.loggerComponent?.instance.onLoad();
  }
  showBrowser(){ 
    this.hideAll(); 
    this.browserDiv.nativeElement.style.display='block';
  }
  showViewer(){ 
    this.hideAll(); 
    this.viewerDiv.nativeElement.style.display='block';
  }
  showWatcher( item: ElementInterface = Util.elements[this.index] ){ 
    this.hideAll(); 
    this.watcherDiv.nativeElement.style.display='block';
  }
  // showWaiting( item: ElementInterface = Util.elements[this.index] ){ 
  //   this.hideAll(); 
  //   this.waitingComponent.nativeElement.style.display='block';
  // }
  adminPortForward(){ 
    console.log("CORE adminPortForward ");
    this.loadActions( Util.elements[this.index] , "PortForwardAdmin" );
    this.showWatcher();
  }

  loadChilds() {
    if (Util.elements.length == 0) return;
    if (Util.elements[this.index].childs.length == 0) return;
    const viewContainerRef = this.childsHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(MoskisChildComponent);
    componentRef.instance.parentData = Util.elements[this.index];
    componentRef.instance.core = this;

    console.log("CORE Core param " + componentRef.instance.core);
  }
  onReload() : void {
    this.coreService.doReload().then((response: ActionInterface) => {
      console.log("RELOAD "+ response.result + " " + response.message);
    });
    window.location.reload();
  }
  serverAction:string = "";
  onPlay() : void {
    this.serverAction = "doPlay";
    this.showQuestion(this, "Deploy platform?", "", true);
  }
  onDestroy():void{
    this.serverAction = "doDestroy";
    this.showQuestion(this, "Undeploy platform?", "", true);
  }
  onQuit():void{
    this.serverAction = "doQuit";
    this.showQuestion(this, "Quit and close the backed server?", "", true);
  }
  doAction( action: ExecuteActionInterface ){
    this.coreService.doAction( action ).then((response: ActionInterface) => {
      console.log("ACTION "+ response.result + " " + response.message);
      return response.message;
    });
  }
  questionDoit(newValue:any){
    if (this.serverAction == "doPlay"){
      this.showWaiting(this, "Deploying platform....");
      this.coreService.doPlay().then((response: ActionInterface) => {
        console.log("PLAY "+ response.result + " " + response.message)
        this.hideWaiting();
      });
    }else if (this.serverAction == "doDestroy"){
      this.showWaiting(this, "Undeploying platform....");
      this.coreService.doDestroy().then((response: ActionInterface) => {
        console.log("DESTROY "+ response.result + " " + response.message)
        this.hideWaiting();
      });
    }else if (this.serverAction == "doQuit"){
      this.coreService.doQuit().then((response: ActionInterface) => {
        console.log("QUIT "+ response.result + " " + response.message)
      });
    }
  }

  loadBrowser() {
    console.log("CORE Browser ");
    const viewContainerRef = this.browserHost.viewContainerRef;
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
    componentRef.instance.core = this;
  }
  loadLogger() {
    console.log("CORE Log ");
    const viewContainerRef = this.logHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(LoggerComponent);
    this.loggerComponent = componentRef;
  }

  loadWatcher(item: ElementInterface = Util.elements[this.index]){
    console.log("CORE Watch " + item.name);
    // this.showWatcher();
    const viewContainerRef = this.watcherHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(WatcherComponent);
    this.watchComponent = componentRef;
    componentRef.instance.watchItem = item;
    componentRef.instance.attributes = new Map(item.attributes);
    componentRef.instance.core = this;
  }

  loadActions(item: ElementInterface, actionName : string ){
    console.log("WATCHER loadActions " + this.watcherHost);
    const viewContainerRef = this.watcherHost.viewContainerRef;
    viewContainerRef.clear();

    const actionItem: ElementItem = Util.getActionsComponent( item , actionName);
    console.log("Action CLass " + actionItem.component.name);
    const componentRef = viewContainerRef.createComponent( actionItem.component );
    this.actionComponent = componentRef;
    componentRef.instance.actionsItem = item;
    componentRef.instance.actionsSelected = actionName;
    componentRef.instance.core = this;
  }

  showQuestion(callBack: any, message: string, value: string, hideInput:boolean = false){
    console.log("BROWSER Question  " + message );
    const viewContainerRef = this.questionHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(QuestionComponent);
    this.questionComponent = componentRef;
    componentRef.instance.message = message;
    componentRef.instance.value = value;
    componentRef.instance.hideInput = hideInput;
    componentRef.instance.callBack = callBack;
    componentRef.instance.isOpen = true;
  }
  showWaiting(callBack: any, message: string){
    console.log("BROWSER Waiting  " + message );
    const viewContainerRef = this.questionHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(WaitingComponent);
    this.waitingComponent = componentRef;
    componentRef.instance.message = message;
    // componentRef.instance.callBack = callBack;
    componentRef.instance.isOpen = true;
  }
  onBar(){
    this.showWaiting(this, "Wait!!! process running....");
  }
}
