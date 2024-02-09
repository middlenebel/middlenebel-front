import { Injectable } from '@angular/core';

import { ActionInterface } from './actionInterface';
import { BrowserActionInterface } from './browserActionInterface';
import { TreeNode } from './treeNodeInterface';
import { Util } from './util';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  urlReload = 'http://localhost:8081/browserReload';  
  urlAction = 'http://localhost:8081/browserAction';

  DEFAULT: TreeNode[] = [{"name":".","base":"/","children": []}];
   
  constructor(){ };

  async doAction(action: BrowserActionInterface): Promise<ActionInterface> {
    try{
      const result = await fetch(this.urlAction, {
        method: 'POST',
        body: JSON.stringify(action)
      });
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return {result:"KO", message:"Unknown error"};
  }

  async doReload(): Promise<TreeNode[]> {
    try{
      const result = await fetch(this.urlReload);
      return await result.json();
    } catch(e) {
      console.log(e); 
    }
    return this.DEFAULT;
  }
}
