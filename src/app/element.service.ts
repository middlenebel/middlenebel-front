import { Injectable } from '@angular/core';

import { ElementInterface } from './elementInterface';
import { ActionInterface } from './actionInterface';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  urlStatus = 'http://localhost:8081/status';
  urlComponents = 'http://localhost:8081/components';
  urlSaveScript = 'http://localhost:8081/save-script';
   
  constructor(){ };

  async getAllElements(): Promise<ElementInterface[]> {
    try{
      const data = await fetch(this.urlComponents);
      return await data.json();
    } catch(e) {
      console.log(e); 
    }
    return Util.getDefaultElements();
  }

  async saveScript(script: string): Promise<ActionInterface> {
    try{
      const data = await fetch(this.urlSaveScript, {
        method: 'POST',
        body: script
      });
      return await data.json();
    } catch(e) {
      console.log(e); //TODO put in result
    }
    return Util.getKoResult();
  }
}
