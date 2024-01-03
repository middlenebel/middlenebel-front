export interface ElementInterface {
    className: string;
    name: string;
    childs: ElementInterface[];
    script?: string;
    logContent?: string;
    // attributes?: string[][];
    // attributes?:Iterable<readonly [string, string]>;
    attributes?: any;
    folders?: any;
  }