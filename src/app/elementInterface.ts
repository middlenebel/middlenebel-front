export interface ElementInterface {
    className: string;
    name: string;
    childs: ElementInterface[];
    script?: string;
    logContent?: string;
    attributes?: any;
    folders?: any;
    actions: string[];
    portForwards?: string[];
  }