import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';
import { ManuhBridge } from 'manuh-bridge'

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.playerName = props.player;
        this.playerCode = props.code;

        console.log('props', JSON.stringify(props));
        this.initManuhBridge();
    }

    initManuhBridge() {
        let mqttConfig = {
            protocol: 'wss',
            host: 'iot.eclipse.org',
            port: 443,
            context: 'ws'
        }
    
        this.manuhBridge = new ManuhBridge(manuh, mqttConfig, ()=>{
            console.log('Client connected!');
            this.manuhBridge.subscribeRemote2LocalTopics([ `forca/player/${this.playerCode}/add`, 'forca/player/turn/set', 'forca/end', 'forca/remote/question/set' ]);
            this.manuhBridge.subscribeLocal2RemoteTopics([ 'forca/player/letter/set', 'forca/player/turn/change' ]);
        });
        
        
    }
}