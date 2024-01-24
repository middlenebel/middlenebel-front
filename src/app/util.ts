import { ElementInterface } from './elementInterface';
import { ElementItem } from './element.item';

import { ItemCoreComponent } from './item-core/item-core.component';
import { ItemPlatformComponent } from './item-platform/item-platform.component';
import { ItemDockerComponent } from './item-docker/item-docker.component';
import { ItemK8sComponent } from './item-k8s/item-k8s.component';
import { ItemKafkaComponent } from './item-kafka/item-kafka.component';
import { ItemMysqlComponent } from './item-mysql/item-mysql.component';

import { ActionKafkaProducerComponent } from './action-kafka-producer/action-kafka-producer.component';
import { ActionKafkaConsumerComponent } from './action-kafka-consumer/action-kafka-consumer.component';
import { ItemNebelcompComponent } from './item-nebelcomp/item-nebelcomp.component';
import { ActionNebelCompComponent } from './action-nebelcomp/action-nebelcomp.component';
import { ActionPortforwardComponent } from './action-portforward/action-portforward.component';
import { ActionConfirmComponent } from './action-confirm/action-confirm.component';
import { ActionPortforwardListComponent } from './action-portforward-list/action-portforward-list.component';

export class Util {
    static kafkaProducerRunning : boolean = false;
    static kafkaConsumerRunning : boolean = false;
    static kafkaTopicProducer : string = "purchases";
    static kafkaTopicConsumer : string = "purchases";
    static kafkaMessageProducer : string = "Message to send - {{num}}";
    static BrowserSelectedNode? : any;

    static elements : ElementInterface[] = this.getDefaultElements(); 
    static getDefaultElements():ElementInterface[]{
        return [
            {
                "className":"Core",
                "name":"Main system of Moskys.",
                "actions": ["test"],
                "childs":[]
            },
            {
                "className":"Platform",
                "name":"Servers and services group.",
                "actions": ["test"],
                "childs":[]
            },
            {
                "className":"DockerDesktop",
                "name":"Personal cloud for develop and testing.",
                "actions": ["test"],
                "childs":[]
            },
            {
                "className":"K8S",
                "name":"Cluster manager for DockerDesktop.",
                "actions": ["test"],
                "childs":[]
            },
            {
                "className":"K8S-Kafka",
                "name":"Cluster manager for DockerDesktop.",
                "actions": ["Producer", "Consumer"],
                "childs":[]
            },
            {
                "className":"K8S-MySQL",
                "name":"Generic component for test modules in the back-end.",
                "actions": ["test"],
                "childs":[]
            },
            {
                "className":"NebelComp",
                "name":"Generic component for test modules in the back-end.",
                "actions": ["test"],
                "childs":[]
            }
        ];
    }

    static getElementComponent( element:ElementInterface ):ElementItem{
        if (element.className === "Core") return new ElementItem( ItemCoreComponent , element);
        if (element.className === "Platform") return new ElementItem( ItemPlatformComponent , element);
        if (element.className === "DockerDesktop") return new ElementItem( ItemDockerComponent , element);
        if (element.className === "K8S") return new ElementItem( ItemK8sComponent , element);
        if (element.className === "K8S-Kafka") return new ElementItem( ItemKafkaComponent , element);
        if (element.className === "K8S-MySQL") return new ElementItem( ItemMysqlComponent , element);
        if (element.className === "NebelComp") return new ElementItem( ItemNebelcompComponent , element);
        return new ElementItem( ItemCoreComponent , {className:'Undefined', name:'Undefined'});
    }

    static getActionsComponent( element:ElementInterface , actionName : string ):ElementItem{
        if ((element.className === "Core") && (actionName === "PortForwardAdmin" )) return new ElementItem( ActionPortforwardListComponent , element);
        if ((element.className === "K8S-Kafka") && (actionName === "KProducer" )) return new ElementItem( ActionKafkaProducerComponent , element);
        if ((element.className === "K8S-Kafka") && (actionName === "KConsumer" )) return new ElementItem( ActionKafkaConsumerComponent , element);
        if ((element.className === "K8S-Kafka") && (actionName === "K8S-Kafka-PortForward" )) return new ElementItem( ActionPortforwardComponent , element);
        if ((element.className === "K8S-MySQL") && (actionName === "K8S-MySQL-PortForward" )) return new ElementItem( ActionPortforwardComponent , element);
        if ((element.className === "K8S-MySQL") && (actionName === "K8S-MySQL-Initialize" )) return new ElementItem( ActionConfirmComponent , element);
        if ((element.className === "NebelComp") && (actionName === "DoNothing" )) return new ElementItem( ActionConfirmComponent , element);
        if ((element.className === "NebelComp") && (actionName === "NebelComp-PortForward" )) return new ElementItem( ActionPortforwardComponent , element);
        if ((element.className === "NebelComp") ) return new ElementItem( ActionNebelCompComponent , element);
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