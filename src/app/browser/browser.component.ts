import { Component, Input, ViewChild, inject } from '@angular/core';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import { ItemCoreComponent } from '../item-core/item-core.component';
import { BrowserActionInterface } from "../browserActionInterface";
import { ActionInterface } from '../actionInterface';
import { TreeNode } from '../treeNodeInterface';
import { BrowserService } from '../browser.service';
import { TestComponent } from '../test/test.component';
import { QuestionComponent } from "../question/question.component";
import { Util } from '../util';

/** Flat node with expandable and level information */
interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  base: string;
  selected?: boolean;
}

@Component({
  selector: 'app-browser',
  template: `
    <div class="browser-bar">
      <img src="assets/refresh-cw.svg" matTooltip="Reload" class="textEditor-button" (click)="loadFolders()">
      <img src="assets/folder-plus.svg" matTooltip="New folder" class="browser-button" (click)="askNewFolder!.show()">
      <img src="assets/file-plus.svg" matTooltip="New file" class="browser-button" (click)="askNewFile!.show()">
      <img src="assets/trash-alt.svg" matTooltip="Delete" class="browser-button" (click)="askDelete!.show()">
      <img src="assets/file-arrow-down-alt-svgrepo-com.svg" matTooltip="Load script" class="browser-button" (click)="askLoad!.show()">
      <h2 class="browser-current" matTooltip="Rename" (click)="askRename!.show()">{{selectedNode?.name}}</h2>
    </div>
    <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <!-- This is the tree node template for leaf nodes -->
  <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
    <!-- use a disabled button to provide padding for tree leaf -->
    <button mat-icon-button disabled></button>
    <p *ngIf="node.name!='.'" [ngClass]="node.selected ? 'browser-name-active' : 'browser-name'" (click)="onSelect(node)">{{node.name}}</p>
  </mat-tree-node>
  <!-- This is the tree node template for expandable nodes -->
  <mat-tree-node *matTreeNodeDef="let node;when: hasChild" matTreeNodePadding>
    <button mat-icon-button matTreeNodeToggle
            [attr.aria-label]="'Toggle ' + node.name">
      <mat-icon class="mat-icon-rtl-mirror">
        {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
      </mat-icon>
    </button>
    <p [ngClass]="node.selected ? 'browser-name-active' : 'browser-name'" (click)="onSelect(node)">{{node.name}}</p>
  </mat-tree-node>
</mat-tree>
<app-question #askNewFolder [onDoIt]="doNewFolder" [hideInput]=false value="Name" message="Name of new folder in {{this.selectedNode?.base}}:"/>
<app-question #askNewFile [onDoIt]="doNewFile" [hideInput]=false value="Name" message="Name of new file in {{this.selectedNode?.base}}:"/>
<app-question #askDelete [onDoIt]="doDelete" [hideInput]=true message="Delete {{this.selectedNode?.name}}?"/>
<app-question #askLoad [onDoIt]="doLoadScript" [hideInput]=true message="Load script?"/>
<app-question #askRename [onDoIt]="doRename" [hideInput]=false message="Rename {{this.selectedNode?.name}}?" [value]="this.selectedNode?.name"/>
  `,
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {
  @Input() folders?: any;
  @Input() core? : ItemCoreComponent;

  selectedNode? : any;
  action?: BrowserActionInterface;

  browserService: BrowserService = inject(BrowserService);

  @ViewChild('askNewFile') askNewFile?: QuestionComponent;
  @ViewChild('askDelete') askDelete?: QuestionComponent;
  @ViewChild('askLoad') askLoad?: QuestionComponent;
  @ViewChild('askRename') askRename?: QuestionComponent;
  
  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      base: node.base,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    const data:string ='[{"name":".","base":"/","children": []}]';
    let items:TreeNode[] = JSON.parse( data );
    this.dataSource.data = items;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  //---
  
  ngOnInit(){
    this.loadFolders();
    // this.onSelect(this.dataSource.data[0]);
  }

  loadFolders(){
    this.browserService.doReload().then((response: TreeNode[]) => {
      console.log("BROWSER RELOAD "+ response);
      this.dataSource.data = response;

      if ( Util.BrowserSelectedNode != undefined ){
        this.selectedNode = Util.BrowserSelectedNode;
        this.selectedNode.selected = true;
      }else{
        this.onSelect(this.dataSource.data[0]);
      }
      
    Util.BrowserSelectedNode = this.selectedNode;
    });
  }
  onAddFolder(){
    this.action = {
      action: "addFolder",
      base: this.selectedNode?.base
    }
    this.core?.showQuestion( this, "New folder name", "Name" );
  }
  doAction(actionToDo : BrowserActionInterface){
      this.browserService.doAction( actionToDo ).then((response: ActionInterface) => {
        this.alertResult(response);
      });   
  }
  doNewFolder= (newValue:any): void => { 
    this.doAction( {
      action: "addFolder",
      base: this.selectedNode?.base,
      newValue: newValue
    } );
  }

  doNewFile= (newValue:any): void => { 
    this.doAction( {
      action: "addFile",
      base: this.selectedNode?.base,
      newValue: newValue
    } );
  }

  onSelect(node: any){
    if (this.selectedNode != undefined){
      this.selectedNode.selected = false;
    }
    node.selected = true;
    this.selectedNode = node;
    Util.BrowserSelectedNode = this.selectedNode;
    // console.log("BROWSER Select "+node.name+" "+node.base);
    // console.log("BROWSER Select2 "+node.children);
    // console.log("BROWSER Select3 "+node.expandable);
  }

  doDelete= (newValue:any): void => { 
    if (this.selectedNode != undefined){
      console.log("Base1 "+this.selectedNode.base);
      console.log("Name "+this.selectedNode.name);
      this.doAction( {
        action: "delete",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        isFolder: this.isFolder()
      } );
    }
  }

  isFolder():boolean{
    var tmpIsFolder : boolean = false;
    if (this.selectedNode != undefined){
      console.log("TO DELETE1 "+(this.selectedNode.children != undefined));
      console.log("TO DELETE2 "+ this.selectedNode.children );
      if ((this.selectedNode.children != undefined) || this.selectedNode.expandable ){
        tmpIsFolder = true;
      }
    }
    return tmpIsFolder!;
  }

  doRename = (newValue:any): void => { 
    if (this.selectedNode != undefined){
      console.log("Base1 "+this.selectedNode.base);
      console.log("Name "+this.selectedNode.name);
      if (this.isFolder()){
        var base : string = this.selectedNode.base;
        var pos = base.indexOf("/"+this.selectedNode.name);
        this.selectedNode.base = base.substring(0,pos);
        console.log("Base2 "+this.selectedNode.base);
      }
      
      this.doAction( {
        action: "rename",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        newValue: newValue,
        isFolder: this.isFolder()
      } );
    }
  }

  doLoadScript= (args: any): void => {
    if (this.selectedNode != undefined){
      this.action = {
        action: "loadScript",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        newValue: this.askRename?.value
      };
      this.browserService.doAction( this.action! ).then((response: ActionInterface) => {
        if (response.result=="KO"){
          console.log("BROWSER ACION "+response.result);
          console.log("BROWSER MESSAGE "+response.message);  
          alert(response.message);
        }else{
          if (this.action?.value?.endsWith(".nebel")){
            this.core?.onReload();
          }else{
            console.log("BROWSER doLoadScript "+response.script!);
            this.core?.setScript(response.script!);
          }
        }
      });
    }
  }

  alertResult(response: ActionInterface){
    if (response.result=="KO"){
      console.log("BROWSER ACION "+response.result);
      console.log("BROWSER MESSAGE "+response.message);  
      alert(response.message);
    }else
      this.loadFolders();
  }

  // questionDoit(newValue:any){
  //   if (this.action != undefined){
  //     this.action.newValue = newValue;
  //   }
  //   console.log("questionDoit! "+ this.action?.action + " " + this.action?.base + " " +this.action?.value + " > " + this.action?.newValue);

  //   this.browserService.doAction( this.action! ).then((response: ActionInterface) => {
  //     console.log("BROWSER ACION "+response.result);
  //     console.log("BROWSER MESSAGE "+response.message);
  //     if (this.action?.action=="loadScript"){
  //       this.core?.onReload();
  //     }else{
  //       this.loadFolders();
  //     }
  //   });
  // }
}
