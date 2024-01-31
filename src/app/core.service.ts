import { Injectable } from '@angular/core';

import { ActionInterface } from './actionInterface';
import { Util } from './util';
import { AppComponent } from './app.component';
import { ExecuteActionInterface } from './executeActionInterface';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  urlReload = 'http://localhost:8080/reload';  
  urlPlay = 'http://localhost:8080/play';
  urlGetLog = 'http://localhost:8080/getLog';
  urlClearLog = 'http://localhost:8080/clearLog';
  urlDestroy = 'http://localhost:8080/destroy';
  urlQuit = 'http://localhost:8080/quit';
  urlExecuteAction = 'http://localhost:8080/executeAction';
  urlComponents: any;
   
  constructor(){ };

  async doPlay(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlPlay);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
  async doDestroy(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlDestroy);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
  async doQuit(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlQuit);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }

  async doReload(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlReload);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
  async doGetLog(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlGetLog);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"SERVER-OUT", message:"Unknown error"};
  }
  async doClearLog(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlClearLog);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
  async doAction( action: ExecuteActionInterface): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlExecuteAction, {
        method: 'POST',
        body: JSON.stringify(action)
      });
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
}
