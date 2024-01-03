import { ElementInterface } from './elementInterface';
import { ElementItem } from './element.item';

import { ItemCoreComponent } from './item-core/item-core.component';
import { ItemPlatformComponent } from './item-platform/item-platform.component';
import { ItemDockerComponent } from './item-docker/item-docker.component';
import { ItemK8sComponent } from './item-k8s/item-k8s.component';

export class Util {
    static elements : ElementInterface[] = this.getDefaultElements(); 
    static getDefaultElements():ElementInterface[]{
        return [
            {
                "className":"Core",
                "name":"Main system of Moskys.",
                "childs":[]
            },
            {
                "className":"Platform",
                "name":"Servers and services group.",
                "childs":[]
            },
            {
                "className":"DockerDesktop",
                "name":"Personal cloud for develop and testing.",
                "childs":[]
            },
            {
                "className":"K8S",
                "name":"Cluster manager for DockerDesktop.",
                "childs":[]
            }
        ];
    }

    static getElementComponent( element:ElementInterface ):ElementItem{
        if (element.className === "Core") return new ElementItem( ItemCoreComponent , element);
        if (element.className === "Platform") return new ElementItem( ItemPlatformComponent , element);
        if (element.className === "DockerDesktop") return new ElementItem( ItemDockerComponent , element);
        if (element.className === "K8S") return new ElementItem( ItemK8sComponent , element);
        return new ElementItem( ItemCoreComponent , {className:'Undefined', name:'Undefined'});
      }

    static getKoResult(){
        return {
        result: 'KO',
        message: 'Undefined error!'
      }
    }

    static getDefaultElement(){
        return {
            "className":"Core",
            "name":"Main system of Moskys.",
            "childs":[],
            "attributes" : [["name", "Undef"]]
        };
    }

    static getAtt( attribs: any, name: string){
        var attributes : Map<string, string> = new Map(attribs); 
        return attributes.get( name );
    }
}