import { Component, Input, ViewChild, inject } from '@angular/core';
import { QuestionDirective } from '../question.directive';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { QuestionComponent } from "../question/question.component";
import { ItemCoreComponent } from '../item-core/item-core.component';
import { BrowserActionInterface } from "../browserActionInterface";
import { ActionInterface } from '../actionInterface';
import { TreeNode } from '../treeNodeInterface';
import { BrowserService } from '../browser.service';

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
      <img src="assets/folder-plus.svg" matTooltip="New folder" class="browser-button" (click)="onAddFolder()">
      <img src="assets/file-plus.svg" matTooltip="New file" class="browser-button" (click)="onAddFile()">
      <img src="assets/trash-alt.svg" matTooltip="Delete" class="browser-button" (click)="onDelete()">
      <img src="assets/file-arrow-down-alt-svgrepo-com.svg" matTooltip="Load script" class="browser-button" (click)="onLoad()">
      <h2 class="browser-current" matTooltip="Rename" (click)="onCurrent()">{{selectedNode?.name}}</h2>
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
  `,
  styleUrls: ['./browser.component.css']
})
export class BrowserComponent {
  @Input() folders?: any;
  @Input() core? : ItemCoreComponent;

  selectedNode? : any;
  action?: BrowserActionInterface;

  browserService: BrowserService = inject(BrowserService);
  
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
    this.onSelect(this.dataSource.data[0]);
  }

  loadFolders(){
    this.browserService.doReload().then((response: TreeNode[]) => {
      console.log("BROWSER RELOAD "+ response);
      this.dataSource.data = response;
    });
  }
  onAddFolder(){
    this.action = {
      action: "addFolder",
      base: this.selectedNode?.base
    }
    this.core?.showQuestion( this, "New folder name", "Name" );
  }
  onAddFile(){
    this.action = {
      action: "addFile",
      base: this.selectedNode?.base
    }
    this.core?.showQuestion( this, "New file name", "Name" );
  }
  onSelect(node: any){
    if (this.selectedNode != undefined){
      this.selectedNode.selected = false;
    }
    node.selected = true;
    this.selectedNode = node;
    console.log("BROWSER Select "+node.name+" "+node.base);
    console.log("BROWSER Select2 "+node.children);
    console.log("BROWSER Select3 "+node.expandable);
  }
  onDelete(){
    if (this.selectedNode != undefined){
      var isDeleteFolder = false;
      console.log("TO DELETE1 "+(this.selectedNode.children != undefined));
      console.log("TO DELETE2 "+ this.selectedNode.children );
      if ((this.selectedNode.children != undefined) || this.selectedNode.expandable ){
        isDeleteFolder = true;
      }
      this.action = {
        action: "delete",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        isFolder: isDeleteFolder
      };
      var hideInput = true;
      this.core?.showQuestion( this, "Delete " + this.selectedNode.name + "?", this.selectedNode.name, hideInput );
    }
  }
  onCurrent(){  
    if (this.selectedNode != undefined){
      this.action = {
        action: "rename",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        newValue: ""
      };
      this.core?.showQuestion( this, "Rename " + this.selectedNode.name, this.selectedNode.name );
    }
  }
  onLoad(){
    if (this.selectedNode != undefined){
      this.action = {
        action: "loadScript",
        base: this.selectedNode?.base,
        value: this.selectedNode?.name,
        newValue: ""
      };
      this.core?.showQuestion( this, "Load " + this.selectedNode.name, this.selectedNode.name );
    }
  }

  questionDoit(newValue:any){
    if (this.action != undefined){
      this.action.newValue = newValue;
    }
    console.log("questionDoit! "+ this.action?.action + " " + this.action?.base + " " +this.action?.value + " > " + this.action?.newValue);

    this.browserService.doAction( this.action! ).then((response: ActionInterface) => {
      console.log("BROWSER ACION "+response.result);
      console.log("BROWSER MESSAGE "+response.message);
    });

    if (this.action?.action=="loadScript"){
      this.core?.onReload();
    }else{
      this.loadFolders();
    }
  }
}
