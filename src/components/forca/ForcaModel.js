import React, { Component } from 'react'; 
import { RhelenaPresentationModel, globalState } from 'rhelena';
import manuh from 'manuh';

export default class ForcaModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.playerName = props.player;
        this.playerCode = props.code;
        this.testCode = props.code;
        this.error = 0;
        this.maxError = 5; 
        this.showMessage = false;
        this.showConfetti = false;
        this.message = '';

        this.config = {
            angle: 90,
            spread: 207,
            startVelocity: 29,
            elementCount: 184,
            decay: 0.93
        };

        manuh.subscribe(`forca/player/${this.playerCode}/add`, `ForcaPlayer-${this.playerCode}`, (msg, info) => {
            this.error++;
            if(this.error == this.maxError){
                console.log('FIM DE JOGO!');
                manuh.publish(`forca/remote/end`, JSON.stringify({ type: "hang", player: this.playerCode, runningGame: false}));
                manuh.publish(`forca/end`, { type: "hang", player: this.playerCode, runningGame: false});
            }
        });

        manuh.subscribe(`forca/end`, `ForcaModal-${this.type}-${this.playerCode}-local`, (msg, info) => {
            if(msg != undefined){
                if(msg.player == this.testCode){
                    if(msg.type == 'winner'){
                        this.message = 'Você é o Vencedor!'
                        this.showConfetti = true;
                    }else if(msg.type == 'hang'){
                        this.message = `Você Perdeu!`
                        this.error = this.maxError;
                    }
                    this.showMessage = true;
                }
            }
        });

        manuh.subscribe(`forca/remote/end`, `ForcaModal-${this.type}-${this.playerCode}-remote`, (msg, info) => {
            if(msg != undefined){
                msg = JSON.parse(msg);
                if(msg.player == this.testCode){
                    if(msg.type == 'winner'){
                        this.message = 'Você é o Vencedor!'
                        this.showConfetti = true;
                    }else if(msg.type == 'hang'){
                        this.message = `Você Perdeu!`
                        this.error = this.maxError
                    }
                    this.showMessage = true;
                }
            }
        });
    }
}