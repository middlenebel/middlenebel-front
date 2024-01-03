import { Injectable } from '@angular/core';

import { ActionInterface } from './actionInterface';
import { Util } from './util';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  urlReload = 'http://localhost:8080/reload';  
  urlPlay = 'http://localhost:8080/play';
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

  async doReload(): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlReload);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }
}
