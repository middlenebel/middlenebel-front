import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementDirective } from './element.directive';
import { ChildsDirective } from './childs.directive';
import { NextDirective } from './next.directive';
import { ViewerDirective } from './viewer.directive';
import { WatcherDirective } from './watcher.directive';
import { QuestionDirective } from './question.directive';
import { BrowserDirective } from './browser.directive';
import { LogDirective } from './log.directive';
import { HomeComponent } from './home/home.component';
import { MoskisElementComponent } from './moskis-element/moskis-element.component';
import { ItemCoreComponent } from './item-core/item-core.component';
import { MoskisChildComponent } from './moskis-child/moskis-child.component';
import { ItemPlatformComponent } from './item-platform/item-platform.component';
import { ItemDockerComponent } from './item-docker/item-docker.component';
import { ItemK8sComponent } from './item-k8s/item-k8s.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ViewerComponent } from './viewer/viewer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { LoggerComponent } from './logger/logger.component';
import { BrowserComponent } from './browser/browser.component';
import { ItemKafkaComponent } from './item-kafka/item-kafka.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent,
    MoskisElementComponent, 
    ElementDirective, ChildsDirective, NextDirective, ViewerDirective, 
    WatcherDirective, QuestionDirective, BrowserDirective, LogDirective,
    ItemCoreComponent, 
    ItemPlatformComponent, ItemDockerComponent, MoskisChildComponent, 
    ItemK8sComponent, ViewerComponent, LoggerComponent, BrowserComponent, ItemKafkaComponent, 
    // WatcherComponent, QuestionComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule, MatTooltipModule,
    ReactiveFormsModule, MatTreeModule, MatIconModule,
  ],
  providers: [ ],
  bootstrap: [
    AppComponent
  ]
})  
export class AppModule { }
