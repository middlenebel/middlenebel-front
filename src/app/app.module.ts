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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';

import { ViewerComponent } from './viewer/viewer.component';
import { HomeComponent } from './home/home.component';
import { MoskisElementComponent } from './moskis-element/moskis-element.component';
import { ItemCoreComponent } from './item-core/item-core.component';
import { MoskisChildComponent } from './moskis-child/moskis-child.component';
import { ItemPlatformComponent } from './item-platform/item-platform.component';
import { ItemDockerComponent } from './item-docker/item-docker.component';
import { ItemK8sComponent } from './item-k8s/item-k8s.component';
import { LoggerComponent } from './logger/logger.component';
import { BrowserComponent } from './browser/browser.component';
import { ItemKafkaComponent } from './item-kafka/item-kafka.component';
import { ItemNebelcompComponent } from './item-nebelcomp/item-nebelcomp.component';
import { TestComponent } from "./test/test.component";
import { QuestionComponent } from "./question/question.component";
import { WaitingComponent } from "./waiting/waiting.component";
import { ItemMysqlComponent } from './item-mysql/item-mysql.component';
//import { ActionKafkaProducerComponent } from './action-kafka/action-kafka-producer.component';
//import { ActionKafkaConsumerComponent } from './action-kafka-consumer/action-kafka-consumer.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent,
    MoskisElementComponent,
    ElementDirective, ChildsDirective, NextDirective, ViewerDirective,
    WatcherDirective, QuestionDirective, BrowserDirective, LogDirective,
    MoskisChildComponent, ViewerComponent, LoggerComponent, BrowserComponent,
    ItemCoreComponent, ItemNebelcompComponent,
    ItemPlatformComponent, ItemDockerComponent,
    ItemK8sComponent, ItemKafkaComponent, ItemMysqlComponent,
    // Standalones: WatcherComponent, QuestionComponent, WaitingComponent, 
    // ActionKafkaConsumerComponent, ActionKafkaProducerComponent, 
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule, MatTooltipModule,
    MatTreeModule, MatIconModule,
    MatTableModule,
    TestComponent, QuestionComponent, WaitingComponent,
  ]
})
export class AppModule {
}
