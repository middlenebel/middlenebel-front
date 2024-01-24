import { Component, Input, enableProdMode, ElementRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-waiting',
  standalone: true,
  imports: [OverlayModule, CommonModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, FormsModule, 
  ],
  template: `
  <span #myOrigin>
    <ng-template cdkConnectedOverlay [cdkConnectedOverlayOrigin]="myOrigin" [cdkConnectedOverlayOpen]="isOpen">
      <div class="waitingContainer" #myOrigin>
        <div class="waitingHeader">
          <div class="sample-content">
              <svg
                  width="100"
                  height="100"
                  viewBox="0 0 200 200"
                  color="#3f51b5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                  <linearGradient id="spinner-secondHalf">
                    <stop offset="0%" stop-opacity="0" stop-color="currentColor" />
                    <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
                  </linearGradient>
                  <linearGradient id="spinner-firstHalf">
                    <stop offset="0%" stop-opacity="1" stop-color="currentColor" />
                    <stop offset="100%" stop-opacity="0.5" stop-color="currentColor" />
                  </linearGradient>
                </defs>

                <g stroke-width="8">
                  <path stroke="url(#spinner-secondHalf)" d="M 4 100 A 96 96 0 0 1 196 100" />
                  <path stroke="url(#spinner-firstHalf)" d="M 196 100 A 96 96 0 0 1 4 100" />

                  <!-- 1deg extra path to have the round end cap -->
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    d="M 4 100 A 96 96 0 0 1 4 98"
                  />
                </g>
                <animateTransform
                  from="0 0 0"
                  to="360 0 0"
                  attributeName="transform"
                  type="rotate"
                  repeatCount="indefinite"
                  dur="1300ms"
                />
              </svg>
          </div>
          <div class="waiting-description">
            <h2 class="waiting-message">{{ this.message }}</h2>
          </div>
        </div>
        <!-- <div class="questionFoot">
          <button mat-raised-button (click)="onCancel($event)" type="button" cdkOverlayOrigin #trigger="cdkOverlayOrigin">
            Close
          </button>
        </div> -->
      </div>
    </ng-template>
  </span>
  `,
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent {
  @Input() message: string = "Please wait...";
  @Input() isOpen: boolean = false;

  cancelled : boolean = false;

  progress : number = 0;

  show(){
    this.isOpen = true;

  }

  ngOnInit(){
    enableProdMode();
    // this.poll();
    console.log("Waiting...");
  }

  onCancel(event: any){
    this.isOpen = false;
    console.log("Waiting end!");
  }
  
  updateEveryMs = 1000;  
  async poll() {
    while (this.isOpen) {
      console.log("progress "+this.progress);
      this.progress = Math.random() * 50;
      await this.sleep(this.updateEveryMs);
    }
  }
  sleep(ms:any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
