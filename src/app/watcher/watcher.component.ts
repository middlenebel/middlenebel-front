import { Component, Input, ViewChild } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgFor, NgForOf} from "@angular/common";

import { ElementInterface } from '../elementInterface';
import { ItemCoreComponent } from '../item-core/item-core.component';

import {MatTableModule} from '@angular/material/table';

export interface KeyValueElement {
  attribute: string;
  value: string;
}
const ELEMENT_DATA: KeyValueElement[] = [
  {attribute: 'Helium', value: 'He'},
  {attribute: 'Lithium', value: 'Li'},
  {attribute: 'Beryllium', value: 'Be'},
];
@Component({
  selector: 'app-watcher',
  template: `
  <div class="watcherContainer">
    <div class="watcherContent">
      <!-- <table mat-table [dataSource]="myDataArray" class="mat-elevation-z8"> -->
      <mat-table #table [dataSource]="myDataArray" class="mat-elevation-z8">
      <ng-container matColumnDef="attribute">
        <th mat-header-cell *matHeaderCellDef> Attribute </th>
        <!-- <td mat-cell *matCellDef="let element"> {{element.attribute}} </td> -->
        <td mat-cell *matCellDef="let element"> {{element[0]}} </td>
      </ng-container>

      <!-- Name Column -->
      <ng-container matColumnDef="value">
        <th mat-header-cell *matHeaderCellDef> Value </th>
        <td mat-cell *matCellDef="let element"> {{element[1]}} </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </mat-table>
    </div>
      <!-- <div class="watcherContent">Attributes
        <div class="watcher-attributes">
            <p class="watcher-attribute" *ngFor="let key of attributes?.keys()">
              {{key}}: {{attributes?.get( key )}}
            </p>
        </div>
      </div> -->
  </div>
        <div>
          <ng-template actionsHost>UNLOADED SYSTEM</ng-template>
        </div>
  `,
  standalone: true,
  imports: [OverlayModule, NgFor, NgForOf, MatTableModule],
  styleUrls: ['./watcher.component.css']
})
export class WatcherComponent {
  @Input() watchItem?: ElementInterface;
  @Input() attributes?: any;
  @Input() core? : ItemCoreComponent;

  displayedColumns: string[] = ['attribute', 'value'];
  myDataArray = ELEMENT_DATA;

  ngOnInit(){
    console.log("WATCH Item " + this.watchItem?.name);
    console.log("WATCH Actions " + this.watchItem?.actions);

    //TODO the data is converted in Core to a Map
    this.myDataArray = this.attributes;
  }
}
