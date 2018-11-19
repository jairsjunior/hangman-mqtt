import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';
import { ManuhBridge } from 'manuh-bridge'

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.playerName = props.player;
        this.playerCode = props.code;

        manuh.subscribe(`forca/remote/clean/set`, `HomeModel-player-${this.playerCode}`, (msg, info) => {
            if(msg != undefined){
                msg = JSON.parse(msg);
                if(msg.clean){
                    window.location.reload();
                }
            }
        });

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
            this.manuhBridge.subscribeRemote2LocalTopics([ 
                `forca/player/${this.playerCode}/add`, 
                'forca/player/turn/set', 
                // 'forca/end', 
                'forca/remote/end', 
                'forca/remote/question/set',
                'forca/player/turn/change',
                'forca/remote/clean/set',
            ]);
            this.manuhBridge.subscribeLocal2RemoteTopics([ 
                'forca/player/letter/set',
                'forca/player/word/set',
                // 'forca/player/turn/change' 
            ]);
        });   
    }


}