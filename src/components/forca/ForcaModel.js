import React, { Component } from 'react'; 
import { RhelenaPresentationModel, globalState } from 'rhelena';
import manuh from 'manuh';

export default class ForcaModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.playerName = props.player;
        this.playerCode = props.code;
        this.error = 0;
        this.maxError = 5; 
        this.endGame = false;

        manuh.subscribe(`forca/player/${this.playerCode}/add`, `ForcaPlayer-${this.playerCode}`, (msg, info) => {
            this.error++;
            if(this.error == this.maxError){
                this.endGame = true;
            }
        });
    }
}