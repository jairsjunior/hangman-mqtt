import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import manuh from 'manuh';
import { ManuhBridge } from 'manuh-bridge'

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.questions = [
            { text: "Teste" , word: "teste" },
            { text: "Jane" , word: "jane" },
            { text: "Junior" , word: "junior" },
        ]

        this.actualPlayer = "1";

        manuh.subscribe(`forca/player/turn/change`, `HomeModel`, (msg, info) => {
            if(msg != undefined){
                this.actualPlayer == "1" ? this.actualPlayer = "2" : this.actualPlayer = "1";
                manuh.publish(`forca/player/turn/set`,  JSON.stringify({ code: this.actualPlayer })); 
            }
        })

        this.initManuhBridge();
    }

    initManuhBridge(){
        let mqttConfig = {
            protocol: 'wss',
            host: 'iot.eclipse.org',
            port: 443,
            context: 'ws'
        }
    
        this.manuhBridge = new ManuhBridge(manuh, mqttConfig, ()=>{
            console.log('Client connected!');
            this.manuhBridge.subscribeRemote2LocalTopics([ 'forca/player/turn/change', 'forca/player/letter/set' ]);
            this.manuhBridge.subscribeLocal2RemoteTopics([ 'forca/player/turn/set', 'forca/end', 'forca/remote/question/set', 'forca/remote/player/letter/set', 'forca/player/1/add', 'forca/player/2/add' ]);
        });
        
    }

    startGame(){
        manuh.publish(`forca/player/turn/set`, JSON.stringify({ code: this.actualPlayer }));
        this.setWord();
    }


    setWord(){
        let position = Math.floor(Math.random() * this.questions.length)
        manuh.publish(`forca/question/set`, this.questions[position])
        manuh.publish(`forca/remote/question/set`, JSON.stringify(this.questions[position]))
    }

    cleanGame(){
        window.location.reload();
    }
}